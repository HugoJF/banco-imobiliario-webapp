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

class TransactionTest extends TestCase
{
    use DatabaseMigrations;
    use DatabaseTransactions;

    public function test_user_can_join_a_match()
    {
        /** @var User $user */
        $user = factory(User::class)->create();

        /** @var Match $match */
        $match = factory(Match::class)->create();

        /** @var MatchService $service */
        $service = app(MatchService::class);

        $service->join($user, $match);

        $this->assertDatabaseHas('match_user', [
            'user_id' => $user->getKey(),
            'match_id' => $match->getKey()
        ]);
    }
    public function test_user_cannot_join_started_match()
    {
        /** @var User $user */
        $user = factory(User::class)->create();

        /** @var Match $match */
        $match = factory(Match::class)->state('started')->create();

        /** @var MatchService $service */
        $service = app(MatchService::class);

        $this->expectException(MatchAlreadyStartedException::class);

        $service->join($user, $match);

        $this->assertDatabaseMissing('match_user', [
            'user_id' => $user->getKey(),
            'match_id' => $match->getKey()
        ]);
    }

    public function test_exception_is_raised_if_user_attempts_to_join_the_same_match()
    {
        /** @var User $user */
        $user = factory(User::class)->create();

        /** @var Match $match */
        $match = factory(Match::class)->create();

        /** @var MatchService $service */
        $service = app(MatchService::class);

        $this->expectException(AlreadyInMatchException::class);

        $service->join($user, $match);
        $service->join($user, $match);

        $this->assertDatabaseHas('match_user', [
            'user_id' => $user->getKey(),
            'match_id' => $match->getKey()
        ]);
    }
}
