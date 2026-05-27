<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id', 'size', 'type_series',
        'thickness', 'unit', 'price',
        'stock_quantity', 'low_stock_threshold'
    ];

    protected $appends = ['is_low_stock'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function saleItems()
    {
        return $this->hasMany(SaleItem::class, 'variant_id');
    }

    public function stockAdjustments()
    {
        return $this->hasMany(StockAdjustment::class, 'variant_id');
    }

    public function getIsLowStockAttribute()
    {
        return $this->stock_quantity <= $this->low_stock_threshold;
    }
}