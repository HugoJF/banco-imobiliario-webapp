<?php

namespace Tests\Feature;

use App\Match;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class MatchTest extends TestCase
{
    use DatabaseMigrations;
    use DatabaseTransactions;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_user_is_redirected_to_login_if_trying_to_join_match_unauthenticated()
    {
        /** @var Match $match */
        $match = factory(Match::class)->create();

        $response = $this->post(route('match.join', $match));

        $response->assertStatus(302);
    }

    public function test_user_can_join_match()
    {
        /** @var Match $match */
        $match = factory(Match::class)->create();

        /** @var User $user */
        $user = factory(User::class)->create();

        Auth::login($user);

        $response = $this->post(route('match.join', $match));

        $response->assertStatus(201);
    }

    public function test_user_cannot_join_match_multiple_times()
    {
        /** @var Match $match */
        $match = factory(Match::class)->state('open')->create();

        /** @var User $user */
        $user = factory(User::class)->create();

        Auth::login($user);

        $response1 = $this->post(route('match.join', $match));
        $response2 = $this->post(route('match.join', $match));

        $response1->assertStatus(201);
        $response2->assertStatus(409);

        $response2->assertJson([
            'error' => 'ALREADY_IN_MATCH',
        ]);
    }

    public function test_user_cannot_join_already_started_match()
    {
        /** @var Match $match */
        $match = factory(Match::class)->state('started')->create();

        /** @var User $user */
        $user = factory(User::class)->create();

        Auth::login($user);

        $response = $this->post(route('match.join', $match));

        $response->assertStatus(409);

        $response->assertJson([
            'error' => 'MATCH_STARTED',
        ]);
    }
}
