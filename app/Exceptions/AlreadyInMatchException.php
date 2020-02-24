<?php

namespace App\Exceptions;


use Symfony\Component\HttpKernel\Exception\HttpException;

class AlreadyInMatchException extends HttpException
{
    public function __construct()
    {
        parent::__construct(409, 'ALREADY_IN_MATCH');
    }
}
