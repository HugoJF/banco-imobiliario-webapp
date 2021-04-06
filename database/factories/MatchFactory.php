<?php

namespace Database\Factories;

use App\Match;
use Illuminate\Database\Eloquent\Factories\Factory;

class MatchFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Match::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'starting_money' => $this->faker->numberBetween(10000, 1000000),
            'started_at' => $this->faker->dateTimeBetween(),
        ];
    }
}
