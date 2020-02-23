<?php

use App\Match;
use App\Transaction;
use App\User;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(Transaction::class, function (Faker $faker) {
    return [
        'value'          => $faker->numberBetween(0, 100000),
        'match_id'       => Match::query()->inRandomOrder()->first(),
        'origin_id'      => User::query()->inRandomOrder()->first(),
        'destination_id' => User::query()->inRandomOrder()->first(),
    ];
});
