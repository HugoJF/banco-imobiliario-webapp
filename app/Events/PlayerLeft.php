<?php

namespace App\Events;

use App\Match;
use App\MatchUser;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
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
     * @param MatchUser $matchUser
     */
    public function __construct(MatchUser $matchUser)
    {
        $this->user = $matchUser->user;
        $this->match = $matchUser->match;
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
}
