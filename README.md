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

or

Run the application in docker:

```
# Build the docker image
$docker build -t giphify-bot-app .

# Run docker container
$docker run -p 3000:3000 -d giphify-bot-app

# To see the logs from container
$docker ps

# Find your container id then
$docker logs <container id>

# Logs:
npm info it worked if it ends with ok
npm info using npm@3.10.10
npm info using node@v6.10.2
npm info lifecycle giphify_bot@0.0.1~prestart: giphify_bot@0.0.1
npm info lifecycle giphify_bot@0.0.1~start: giphify_bot@0.0.1

> giphify_bot@0.0.1 start /usr/src/app
> node index.js

Telegram giphyfy bot listening on port 3000!

```