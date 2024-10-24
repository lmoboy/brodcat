<?php

namespace App\Http\Controllers;
use App\Models\Message;
use Auth;
use App\Events\testEvent;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $save = new Message();
        $message = $request->input('message');
        $user = Auth::user();

        $save->name = $user->name;
        $save->message = $message;
        $save->save();
        event(new testEvent($message, $user));
    }

    public function getMessages()
    {
        return json_encode(Message::all());
    }
}
