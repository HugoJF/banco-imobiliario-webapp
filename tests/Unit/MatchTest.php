<?php

namespace Tests\Unit;

use App\Exceptions\AlreadyInMatchException;
use App\Exceptions\MatchAlreadyStartedException;
use App\Match;
use App\Services\MatchService;
use App\Transaction;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class MatchTest extends TestCase
{
    use DatabaseMigrations;
    use DatabaseTransactions;

    public function test_match_balances_can_be_calculated()
    {
        /** @var User $user1 */
        $user1 = factory(User::class)->create();

        /** @var User $user2 */
        $user2 = factory(User::class)->create();

        /** @var Match $match */
        $match = factory(Match::class)->create();

        /** @var MatchService $service */
        $service = app(MatchService::class);

        $service->join($user1, $match);
        $service->join($user2, $match);

        $transactions = [
            [null, $user1, 1000],
            [null, $user2, 1000],
            [$user1, $user2, 500],
        ];

        foreach ($transactions as [$origin, $destination, $value]) {
            factory(Transaction::class)->create([
                'match_id'       => $match,
                'origin_id'      => $origin ? $origin->getKey() : null,
                'destination_id' => $destination ? $destination->getKey() : null,
                'value'          => $value,
            ]);
        }

        // Check balances for the entire match
        $allBalances = $service->calculateBalances($match);
        $this->assertEquals([
            '1' => 500,
            '2' => 1500,
        ], $allBalances);

        // Check if balances are calculated correctly when IDs are filtered
        $user1Balance = $service->calculateBalances($match, [1]);
        $this->assertEquals([
            '1' => 500,
        ], $user1Balance);

        $user2Balance = $service->calculateBalances($match, [2]);
        $this->assertEquals([
            '2' => 1500,
        ], $user2Balance);
    }

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
            'user_id'  => $user->getKey(),
            'match_id' => $match->getKey(),
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

        // TODO: HTTP 409
        $this->expectException(MatchAlreadyStartedException::class);

        $service->join($user, $match);

        $this->assertDatabaseMissing('match_user', [
            'user_id'  => $user->getKey(),
            'match_id' => $match->getKey(),
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

        // TODO: HTTP 409
        $this->expectException(AlreadyInMatchException::class);

        $service->join($user, $match);

        $this->assertDatabaseHas('match_user', [
            'user_id'  => $user->getKey(),
            'match_id' => $match->getKey(),
        ]);
    }
}
