<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Transaction $transaction
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Transaction  $transaction
     *
     * @return \Illuminate\Http\Response
     */
    public function cancel(Request $request, Transaction $transaction)
    {
        $transaction->canceled_at = now();
        $transaction->save();

        return $transaction;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Transaction $transaction
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
