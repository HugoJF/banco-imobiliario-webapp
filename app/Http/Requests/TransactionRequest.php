<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'origin_id'      => 'required|numeric|exists:users,id',
            'destination_id' => 'required|numeric|exists:users,id',
            'match_id'       => 'required|numeric|exists:matches,id',
        ];
    }
}
