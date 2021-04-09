<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| User routes
|--------------------------------------------------------------------------
*/

Route::prefix('users')->group(function () {
    Route::get('me', [\App\Http\Controllers\UserController::class, 'me'])->name('users.me');
    Route::get('/', [\App\Http\Controllers\UserController::class, 'index'])->name('users.index');
    Route::get('{user}', [\App\Http\Controllers\UserController::class, 'show'])->name('users.show');
    Route::post('login/{user}', [\App\Http\Controllers\UserController::class, 'login'])->name('users.login');
    Route::patch('{user}', [\App\Http\Controllers\UserController::class, 'update'])->name('users.update');
});

/*
|--------------------------------------------------------------------------
| Transaction routes
|--------------------------------------------------------------------------
*/

Route::prefix('transactions')->group(function () {
    Route::patch('{transaction}/cancel', [\App\Http\Controllers\TransactionController::class, 'cancel'])->name('transactions.cancel');
});


/*
|--------------------------------------------------------------------------
| Match routes
|--------------------------------------------------------------------------
*/

Route::prefix('matches')->group(function () {
    Route::get('/', [\App\Http\Controllers\MatchController::class, 'index'])->name('matches.index');
    Route::get('search', [\App\Http\Controllers\MatchController::class, 'search'])->name('matches.search');
    Route::get('{match}', [\App\Http\Controllers\MatchController::class, 'show'])->name('matches.show');
    Route::get('{match}/players', [\App\Http\Controllers\MatchController::class, 'players'])->name('matches.players');
    Route::get('{match}/balances', [\App\Http\Controllers\MatchController::class, 'balances'])->name('matches.balances');
    Route::get('{match}/transactions', [\App\Http\Controllers\MatchController::class, 'transactions'])->name('matches.transactions');

    Route::post('/', [\App\Http\Controllers\MatchController::class, 'store'])->name('matches.store');
    Route::post('{match}/join', [\App\Http\Controllers\MatchController::class, 'join'])->name('matches.join');
    Route::post('{match}/transaction', [\App\Http\Controllers\MatchController::class, 'transaction'])->name('matches.transaction');

    Route::patch('{match}', [\App\Http\Controllers\MatchController::class, 'update'])->name('matches.update');
    Route::patch('{match}/start', [\App\Http\Controllers\MatchController::class, 'start'])->name('matches.start');
    Route::patch('{match}/end', [\App\Http\Controllers\MatchController::class, 'end'])->name('matches.end');
    Route::patch('{match}/next', [\App\Http\Controllers\MatchController::class, 'next'])->name('matches.next');

    Route::delete('leave', [\App\Http\Controllers\MatchController::class, 'leave'])->name('matches.leave');
});
