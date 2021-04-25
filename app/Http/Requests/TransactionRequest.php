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
            'origin_id'      => 'nullable|numeric|exists:users,id',
            'destination_id' => 'nullable|numeric|exists:users,id',
            'value'          => 'required|numeric',
        ];
    }
}
