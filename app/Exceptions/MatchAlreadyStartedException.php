<?php

namespace App\Exceptions;


use Symfony\Component\HttpKernel\Exception\HttpException;

class MatchAlreadyStartedException extends HttpException
{
    public function __construct()
    {
        parent::__construct(409, 'MATCH_STARTED');
    }
}
