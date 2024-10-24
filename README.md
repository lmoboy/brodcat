to launch this mfk
install everything aka
```
composer install
npm install
```
next up

open **4 TERMINALS**
execute in order in each terminal once
```
npm run dev
php artisan ser
php artisan reverb:start
php artisan queue:work
```

most important files to look at
channels.php (contains your open/private channels)
web.php (contains the authed route to post the message in a public channel)
testEvent.php (basically what you need to broadcast a message, constructor with message and user identification, broadcastWith sends the data you pick, broadcastOn is literally channels you are broadcasting on)
MessageController.php (sendMessage is responsible for sending messages, as you will find there a function "event" that calls testEvent with the parameters you had sent)
