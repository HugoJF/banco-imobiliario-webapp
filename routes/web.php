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
    Route::get('me', 'HomeController@me')->name('me');

    Route::prefix('users')->group(function () {
        Route::get('{user}', 'HomeController@user')->name('user');
        Route::patch('{user}', 'HomeController@update')->name('user.update');
    });

    Route::prefix('match')->group(function () {
        Route::get('search', 'MatchController@search')->name('match.search');
        Route::get('{match}/players', 'MatchController@players')->name('match.players');
        Route::get('{match}/balances', 'MatchController@balances')->name('match.balances');

        Route::post('create', 'MatchController@create')->name('match.create');
        Route::post('{match}/join', 'MatchController@join')->name('match.join');
        Route::post('{match}/transaction', 'MatchController@transaction')->name('match.transaction');

        Route::patch('{match}/start', 'MatchController@start')->name('match.start');
        Route::patch('{match}/end', 'MatchController@end')->name('match.end');

        Route::delete('leave', 'MatchController@leave')->name('match.leave');
    });
});

Route::get('grid', function () {
    return view('grid');
});

Route::get('ex', function () {
    throw new \App\Exceptions\AlreadyInMatchException();
});

Route::get('/event', function () {
    //    event(new \App\Events\TestEvent('oi'));
    event(new \App\Events\TurnUpdate(5239));
});
