<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
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
