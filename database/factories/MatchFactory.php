<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Match;
use Faker\Generator as Faker;

$factory->define(Match::class, function (Faker $faker) {
    return [
        'starting_money' => $faker->numberBetween(10000, 1000000),
    ];
});

$factory->state(Match::class, 'started', function (Faker $faker) {
    return [
        'started_at' => $faker->dateTimeBetween(),
    ];
});
