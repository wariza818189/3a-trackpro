<?php

namespace App\Http\Controllers;

use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    public function index()
    {
        return response()->json(
            ProductVariant::with('product.category')->get()
        );
    }

    public function lowStock()
    {
        $variants = ProductVariant::with('product.category')
            ->whereColumn('stock_quantity', '<=', 'low_stock_threshold')
            ->get();
        return response()->json($variants);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id'         => 'required|exists:products,id',
            'unit'               => 'required|string',
            'price'              => 'nullable|numeric',
            'stock_quantity'     => 'required|integer|min:0',
            'low_stock_threshold'=> 'required|integer|min:0',
        ]);

        $variant = ProductVariant::create($request->all());
        return response()->json($variant->load('product.category'), 201);
    }

    public function update(Request $request, ProductVariant $productVariant)
    {
        $request->validate([
            'unit'               => 'required|string',
            'price'              => 'nullable|numeric',
            'stock_quantity'     => 'required|integer|min:0',
            'low_stock_threshold'=> 'required|integer|min:0',
        ]);

        $productVariant->update($request->all());
        return response()->json($productVariant->load('product.category'));
    }

    public function destroy(ProductVariant $productVariant)
    {
        $productVariant->delete();
        return response()->json(['message' => 'Variant deleted']);
    }
}