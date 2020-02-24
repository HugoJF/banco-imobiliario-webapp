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

Route::get('/home', 'HomeController@index')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::prefix('match')->group(function () {
        Route::get('search', 'MatchController@search')->name('match.search');
        Route::get('{match}/players', 'MatchController@players')->name('match.players');
       Route::post('{match}/join', 'MatchController@join')->name('match.join');
    });
});

Route::get('ex', function () {
   throw new \App\Exceptions\AlreadyInMatchException();
});

Route::get('/event', function () {
//    event(new \App\Events\TestEvent('oi'));
    event(new \App\Events\TurnUpdate(5239));
});
