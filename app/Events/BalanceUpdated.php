<?php

namespace App\Events;

use App\Match;
use App\Services\MatchService;
use App\Transaction;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BalanceUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /** @var Match */
    protected $match;

    /** @var array */
    public $balances;

    /**
     * Create a new event instance.
     *
     * @param MatchService $service
     * @param Transaction  $transaction
     */
    public function __construct(Transaction $transaction)
    {
        /** @var MatchService $service */
        $service = app(MatchService::class);

        $this->match = $transaction->match;

        $this->balances = $service->calculateBalances($this->match, [
            $transaction->destination_id,
            $transaction->origin_id,
        ]);
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
