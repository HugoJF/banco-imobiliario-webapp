<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Match;
use App\Services\MatchService;
use App\Transaction;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function search(MatchService $service)
    {
        return $service->current();
    }

    public function players(Match $match)
    {
        return $match->users;
    }

    public function balances(MatchService $service, Match $match)
    {
        return $service->calculateBalances($match);
    }

    public function join(MatchService $service, Match $match)
    {
        $service->join(auth()->user(), $match);

        return response()->json($match)->setStatusCode(201);
    }

    public function create(MatchService $service, Match $match)
    {
        $match = $service->create();

        return $match;
    }

    public function start(MatchService $service, Match $match)
    {
        $service->start($match);

        return $match;
    }

    public function transaction(MatchService $service, TransactionRequest $request, Match $match)
    {
        return $service->createTransaction($match, $request->all());
    }

    public function end(MatchService $service, Match $match)
    {
        $service->end($match);

        return $match;
    }

    public function leave(MatchService $service)
    {
        $service->leaveAll(auth()->user());

        return 'OK';
    }
}
