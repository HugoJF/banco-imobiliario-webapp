<?php

namespace App\Models;

use App\Events\MatchUpdated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    use HasFactory;

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
