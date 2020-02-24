<?php

namespace App\Http\Controllers;

use App\Match;
use App\Services\MatchService;
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

    public function join(MatchService $service, Match $match)
    {
        $service->join(auth()->user(), $match);

        return response()->json($match)->setStatusCode(201);
    }
}
