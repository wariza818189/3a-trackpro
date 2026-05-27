<?php

namespace App\Http\Controllers;

use App\Models\SalesTransaction;
use App\Models\Expense;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $todaySales = SalesTransaction::whereDate('created_at', today())
            ->sum('total_amount');

        $todayExpenses = Expense::whereDate('expense_date', today())
            ->sum('amount');

        $todayTransactions = SalesTransaction::whereDate('created_at', today())
            ->count();

        $lowStockCount = ProductVariant::whereColumn('stock_quantity', '<=', 'low_stock_threshold')
            ->count();

        $topProducts = \App\Models\SaleItem::with('variant.product')
            ->selectRaw('variant_id, SUM(qty_sold) as total_sold')
            ->groupBy('variant_id')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        return response()->json([
            'today_sales'        => $todaySales,
            'today_expenses'     => $todayExpenses,
            'net_income'         => $todaySales - $todayExpenses,
            'today_transactions' => $todayTransactions,
            'low_stock_count'    => $lowStockCount,
            'top_products'       => $topProducts,
        ]);
    }
}