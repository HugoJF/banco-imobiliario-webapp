<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    protected $dates = ['started_at'];

    public function users()
    {
        return $this->belongsToMany(User::class)->using(MatchUser::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
