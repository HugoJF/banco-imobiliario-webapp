<?php

namespace Tests\Unit;

use App\Exceptions\AlreadyInMatchException;
use App\Exceptions\MatchAlreadyStartedException;
use App\Match;
use App\Services\MatchService;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class TransactionUnitTest extends TestCase
{
    use DatabaseMigrations;
    use DatabaseTransactions;
}
