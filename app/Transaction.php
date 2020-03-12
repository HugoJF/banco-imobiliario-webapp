<?php

namespace App;

use App\Events\BalanceUpdated;
use App\Events\TransactionCreated;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected static function boot()
    {
        parent::boot();

        static::created(function ($transaction) {
            event(new TransactionCreated($transaction));
            event(new BalanceUpdated($transaction));
        });

        static::updated(function ($transaction) {
            event(new BalanceUpdated($transaction));
        });
    }

    protected $fillable = ['origin_id', 'destination_id', 'value'];

    public function match()
    {
        return $this->belongsTo(Match::class);
    }

    public function origin()
    {
        return $this->belongsTo(User::class, 'origin_id');
    }

    public function destination()
    {
        return $this->belongsTo(User::class, 'destination_id');
    }
}
