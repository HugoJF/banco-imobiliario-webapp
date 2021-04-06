<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::get('/event', function () {
    //    event(new \App\Events\TestEvent('oi'));
    event(new \App\Events\TurnUpdate(5239));
});

Route::get('{all?}', [\App\Http\Controllers\HomeController::class, 'index'])->where('all', '([A-z\d\-\/_.]+)?');
