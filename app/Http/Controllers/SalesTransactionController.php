<?php

namespace App\Http\Controllers;

use App\Models\SalesTransaction;
use App\Models\ProductVariant;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesTransactionController extends Controller
{
    public function index()
    {
        return response()->json(
            SalesTransaction::with('items.variant.product')->latest()->get()
        );
    }

    public function show(SalesTransaction $salesTransaction)
    {
        return response()->json(
            $salesTransaction->load('items.variant.product')
        );
    }

    public function today()
    {
        $sales = SalesTransaction::whereDate('created_at', today())
            ->with('items.variant.product')
            ->get();

        return response()->json([
            'transactions' => $sales,
            'total' => $sales->sum('total_amount'),
            'count' => $sales->count(),
        ]);
    }

    public function monthly()
    {
        $sales = SalesTransaction::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->get();

        return response()->json([
            'total' => $sales->sum('total_amount'),
            'count' => $sales->count(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'items'              => 'required|array|min:1',
            'items.*.variant_id' => 'required|exists:product_variants,id',
            'items.*.qty_sold'   => 'required|integer|min:1',
            'notes'              => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $totalAmount = 0;
            $saleItemsData = [];

            foreach ($request->items as $item) {
                $variant = ProductVariant::findOrFail($item['variant_id']);

                if ($variant->stock_quantity < $item['qty_sold']) {
                    return response()->json([
                        'message' => "Insufficient stock for: {$variant->product->name}"
                    ], 422);
                }

                $subtotal = $variant->price * $item['qty_sold'];
                $totalAmount += $subtotal;

                $saleItemsData[] = [
                    'variant_id' => $variant->id,
                    'qty_sold'   => $item['qty_sold'],
                    'unit_price' => $variant->price,
                    'subtotal'   => $subtotal,
                ];

                $variant->decrement('stock_quantity', $item['qty_sold']);
            }

            $transaction = SalesTransaction::create([
                'user_id'      => $request->user()->id,
                'total_amount' => $totalAmount,
                'notes'        => $request->notes,
            ]);

            foreach ($saleItemsData as $itemData) {
                $itemData['transaction_id'] = $transaction->id;
                SaleItem::create($itemData);
            }

            DB::commit();

            return response()->json(
                $transaction->load('items.variant.product'), 201
            );

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Sale failed: ' . $e->getMessage()], 500);
        }
    }
}