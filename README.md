# Giphify bot

Pretty simple telegram gif bot

### Structure

```
index.js                    <- Main app module
constant.js                 <- Contain useful constants
utils.js                    <- Module with useful functions
variables.js                <- Hidden layer with API keys
```

### Prerequisites
To run the project locally, you should have:

* npm v.0.10.30+;
* Node ~latest version;
* 'now' package or Ngrok;

### Run the project

1) Install all dependencies first
```
$npm install
```

2) Start your server with simple command 
```
$Node index.js
```

3) Share your [http://localhost:3000](http://localhost:3000) with 'now' service:

```
$now # Follow its instruction then
```

or with Ngrok(simplest way)
```
$./ngrok http 3000 # That will create a tunnel to your localhost under ssl protection
```

Pass your new URL to bot webhook:
```
$curl -F "url=https://example.url.io/new-message" https://api.telegram.org/bot<YOUR_TELEGRAM_API_BOT_TOKEN>/setWebhook
```
### Usage

To start using the bot write a search keyword directly to its private chat or use command ```/random``` to get randomly found gif