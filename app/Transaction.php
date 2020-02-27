<?php

namespace App;

use App\Events\BalanceUpdated;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $dispatchesEvents = [
        'created' => BalanceUpdated::class,
        'updated' => BalanceUpdated::class,
    ];

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
