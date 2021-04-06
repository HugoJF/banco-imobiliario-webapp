<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show(User $user)
    {
        return $user;
    }

    public function me()
    {
        return auth()->user();
    }

    public function update(Request $request, User $user)
    {
        $user->fill($request->input());
        $user->save();

        return $user;
    }
}
