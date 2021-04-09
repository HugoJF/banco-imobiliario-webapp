<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::all());
    }

    public function show(User $user)
    {
        return $user;
    }

    public function login(User $user)
    {
        auth()->login($user);

        return response()->noContent();
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
