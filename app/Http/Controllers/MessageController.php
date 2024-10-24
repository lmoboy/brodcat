<?php

namespace App\Http\Controllers;
use Auth;
use App\Events\testEvent;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = $request->input('message');
        $user = Auth::user();
        event(new testEvent($message, $user)); //broadcast(new testEvent($message, $user))->toOthers();
    }
}
