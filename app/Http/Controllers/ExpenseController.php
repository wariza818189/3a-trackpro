<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        return response()->json(
            Expense::with('user')->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'description'  => 'required|string',
            'category'     => 'required|in:restock,overhead,other',
            'amount'       => 'required|numeric|min:0',
            'expense_date' => 'required|date',
        ]);

        $expense = Expense::create([
            ...$request->all(),
            'user_id' => $request->user()->id,
        ]);

        return response()->json($expense->load('user'), 201);
    }

    public function summary()
    {
        $month = now()->month;
        $year  = now()->year;

        $totalExpenses = Expense::whereMonth('expense_date', $month)
            ->whereYear('expense_date', $year)
            ->sum('amount');

        $totalIncome = \App\Models\SalesTransaction::whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->sum('total_amount');

        return response()->json([
            'total_expenses' => $totalExpenses,
            'total_income'   => $totalIncome,
            'net_profit'     => $totalIncome - $totalExpenses,
        ]);
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();
        return response()->json(['message' => 'Expense deleted']);
    }
}