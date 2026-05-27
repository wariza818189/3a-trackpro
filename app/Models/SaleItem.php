<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
    protected $fillable = [
        'transaction_id', 'variant_id',
        'qty_sold', 'unit_price', 'subtotal'
    ];

    public function transaction()
    {
        return $this->belongsTo(SalesTransaction::class, 'transaction_id');
    }

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }
}