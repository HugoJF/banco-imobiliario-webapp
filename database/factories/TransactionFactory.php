<?php

namespace Database\Factories;

use App\Match;
use App\Transaction;
use App\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Transaction::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'value'          => $this->faker->numberBetween(0, 100000),
            'match_id'       => Match::query()->inRandomOrder()->first(),
            'origin_id'      => User::query()->inRandomOrder()->first(),
            'destination_id' => User::query()->inRandomOrder()->first(),
        ];
    }
}
