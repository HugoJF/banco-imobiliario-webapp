<?php

namespace App;

use App\Events\MatchUpdated;
use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    protected $dispatchesEvents = [
        'updated' => MatchUpdated::class,
    ];

    protected $dates = ['started_at', 'ended_at'];

    protected $fillable = ['starting_money'];

    public function users()
    {
        return $this->belongsToMany(User::class)->using(MatchUser::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
