<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class JoinedMultipleMatchesException extends HttpException
{
    public function __construct()
    {
        parent::__construct(409, 'JOINED_MULTIPLE_MATCHES');
    }
}
