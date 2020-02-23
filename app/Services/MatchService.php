<?php

namespace App\Services;

use App\Exceptions\AlreadyInMatchException;
use App\Exceptions\MatchAlreadyStartedException;
use App\Match;
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
                ->whereIn('origin_id', $ids, 'or')
                ->whereIn('destination_id', $ids)
                ->get();
        } else {
            $users = $match->users;
            $transactions = $match->transactions;
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
}
