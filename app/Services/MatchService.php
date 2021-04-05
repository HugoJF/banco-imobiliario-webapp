<?php

namespace App\Services;

use App\Events\PlayerJoined;
use App\Events\PlayerLeft;
use App\Exceptions\AlreadyInMatchException;
use App\Exceptions\InsufficientBalanceException;
use App\Exceptions\JoinedMultipleMatchesException;
use App\Exceptions\MatchAlreadyStartedException;
use App\Match;
use App\Transaction;
use App\User;
use Illuminate\Support\Collection;

class MatchService
{
    /**
     * @param User  $user
     * @param Match $match
     *
     * @throws AlreadyInMatchException
     * @throws MatchAlreadyStartedException
     */
    public function join(User $user, Match $match): void
    {
        // There is no need to check if it's past, since it should always be.
        if ($match->started_at) {
            throw new MatchAlreadyStartedException();
        }

        if ($match->users()->where('user_id', $user->getKey())->exists()) {
            throw new AlreadyInMatchException();
        }

        $match->users()->attach($user);
        event(new PlayerJoined($user, $match));
    }

    public function current()
    {
        $matches = auth()->user()->matches()->where('ended_at', null)->get();

        if ($matches->count() > 1) {
            throw new JoinedMultipleMatchesException();
        }

        return $matches->first();
    }

    public function create()
    {
        $match = new Match();
        $match->starting_money = 100000; // TODO: improve this
        $match->save();

        return $match;
    }

    /**
     * @param Match $match
     * @param null  $ids
     *
     * @return array
     */
    public function calculateBalances(Match $match, $ids = null): array
    {
        /** @var Collection $users */
        /** @var Collection $transactions */
        if ($ids) {
            $users = $match
                ->users()
                ->whereIn('users.id', $ids)
                ->get();
            $transactions = $match
                ->transactions()
                ->whereNull('canceled_at')
                ->whereIn('origin_id', $ids, 'or')
                ->whereIn('destination_id', $ids)
                ->get();
        } else {
            $users = $match->users;
            $transactions = $match
                ->transactions()
                ->whereNull('canceled_at')
                ->get();
        }

        $balances = $users->mapWithKeys(function ($user) {
            return [$user->id => 0];
        });

        foreach ($transactions as $transaction) {
            $origin = $transaction->origin_id;
            if ($origin && $balances->get($origin) !== null) {
                $balances[ $transaction->origin_id ] -= $transaction->value;
            }

            $destination = $transaction->destination_id;
            if ($destination && $balances->get($destination) !== null) {
                $balances[ $transaction->destination_id ] += $transaction->value;
            }
        }

        return $balances->toArray();
    }

    public function start(Match $match)
    {
        // Clear any existing transactions
        $match->transactions()->delete();

        // Generate starting money for each player
        foreach ($match->users as $user) {
            $transaction = new Transaction();

            $transaction->origin_id = null; // bank
            $transaction->destination_id = $user->id;
            $transaction->value = $match->starting_money;

            $match->transactions()->save($transaction);
        }

        $match->started_at = now();
        $match->save();
    }

    public function end(Match $match)
    {
        $match->ended_at = now();
        $match->save();
    }

    public function leaveAll(User $user)
    {
        $matches = $user->matches()->whereNull(['started_at', 'ended_at'])->get();

        foreach ($matches as $match) {
            event(new PlayerLeft($user, $match));
        }

        $user->matches()->sync([]);
    }

    public function createTransaction(Match $match, array $data)
    {
        /** @var MatchService $matchService */
        $matchService = app(MatchService::class);

        $originId = $data['origin_id'];
        $destinationId = $data['destination_id'];
        $value = $data['value'];

        $balances = $matchService->calculateBalances($match, [$originId, $destinationId]);

        // Check if origin user has enough balance to generate transaction
        if ($originId !== null && $balances[ $originId ] < $value) {
            throw new InsufficientBalanceException();
        }

        $transaction = new Transaction();

        $transaction->fill($data);

        $match->transactions()->save($transaction);

        return $transaction;
    }

    public function nextTurn(Match $match)
    {
        $match->turn = $match->turn + 1;
        $match->save();

        return $match;
    }

    public function update(Match $match, array $data)
    {
        $match->fill($data);
        $match->save();

        return $match;
    }
}
