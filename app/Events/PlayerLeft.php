<?php

namespace App\Events;

use App\Models\Match;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PlayerLeft implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /** @var User */
    public $user;

    /** @var Match */
    protected $match;

    /**
     * Create a new event instance.
     *
     * @param User  $user
     * @param Match $match
     */
    public function __construct(User $user, Match $match)
    {
        $this->user = $user;
        $this->match = $match;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return ["match-{$this->match->id}"];
    }

    public function getMatch()
    {
        return $this->match;
    }
}
