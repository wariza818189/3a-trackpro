<?php

namespace App\Http\Controllers;

use App\Models\StockAdjustment;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class StockAdjustmentController extends Controller
{
    public function index()
    {
        return response()->json(
            StockAdjustment::with(['variant.product', 'user'])->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'variant_id' => 'required|exists:product_variants,id',
            'type'       => 'required|in:restock,damage,correction',
            'quantity'   => 'required|integer|min:1',
            'reason'     => 'nullable|string',
        ]);

        $variant = ProductVariant::findOrFail($request->variant_id);

        if ($request->type === 'restock') {
            $variant->increment('stock_quantity', $request->quantity);
        } elseif ($request->type === 'damage') {
            $variant->decrement('stock_quantity', $request->quantity);
        } elseif ($request->type === 'correction') {
            $variant->update(['stock_quantity' => $request->quantity]);
        }

        $adjustment = StockAdjustment::create([
            'variant_id' => $request->variant_id,
            'user_id'    => $request->user()->id,
            'type'        => $request->type,
            'quantity'    => $request->quantity,
            'reason'      => $request->reason,
        ]);

        return response()->json($adjustment->load(['variant.product', 'user']), 201);
    }
}