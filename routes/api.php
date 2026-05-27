<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariantController;
use App\Http\Controllers\SalesTransactionController;
use App\Http\Controllers\StockAdjustmentController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\DashboardController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes — all authenticated users
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Categories — read only for staff
    Route::get('/categories', [CategoryController::class, 'index']);

    // Products — read only for staff
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);

    // Variants — read only for staff
    Route::get('/variants', [ProductVariantController::class, 'index']);
    Route::get('/variants/low-stock', [ProductVariantController::class, 'lowStock']);

    // Sales — all users
    Route::get('/sales', [SalesTransactionController::class, 'index']);
    Route::post('/sales', [SalesTransactionController::class, 'store']);
    Route::get('/sales/today', [SalesTransactionController::class, 'today']);
    Route::get('/sales/monthly', [SalesTransactionController::class, 'monthly']);
    Route::get('/sales/{salesTransaction}', [SalesTransactionController::class, 'show']);

    // Stock Adjustments — all users
    Route::get('/adjustments', [StockAdjustmentController::class, 'index']);
    Route::post('/adjustments', [StockAdjustmentController::class, 'store']);

    // Expenses — all users except delete
    Route::get('/expenses', [ExpenseController::class, 'index']);
    Route::post('/expenses', [ExpenseController::class, 'store']);
    Route::get('/expenses/summary', [ExpenseController::class, 'summary']);
});

// Admin only routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // Categories — admin only
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    // Products — admin only
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    // Variants — admin only
    Route::post('/variants', [ProductVariantController::class, 'store']);
    Route::put('/variants/{productVariant}', [ProductVariantController::class, 'update']);
    Route::delete('/variants/{productVariant}', [ProductVariantController::class, 'destroy']);

    // Expenses delete — admin only
    Route::delete('/expenses/{expense}', [ExpenseController::class, 'destroy']);
});