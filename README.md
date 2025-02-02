# Juice Status

_ a simple status app to get [juice](https://juice.hackclub.com) data in your Slack status!_

## How to setup this

1. Clone this repo
2. Run `bun install`
3. Edit the `.env` with :
    - `SLACK_SIGNING_SECRET` : Your slack signing secret
    - `SLACK_BOT_TOKEN` : Your slack bot token
    - `JUICE_API_KEY` : Your juice api key
    - `EMMOJI` : The emmoji you want to use
4. Run `bun run index.ts`
5. Enjoy!

## How to get your juice api key

1. Go to [juice](https://juice.hackclub.com)
2. While the page is loading, open dev tools
3. Go to the network tab
4. Reload the page
5. Look for a request to `https://juice.hackclub.com/api/user/`
6. Look at the response and copy the `token` value

## How to get your slack signing secret & bot token

1. Go to [slack](https://api.slack.com/apps)
2. Create a new app
3. Go to the `OAuth & Permissions` tab
4. Add users.profile:write to the `Bot Token Scopes`
5. Install the app to your workspace
6. Copy the `Bot User OAuth Token`
7. Go to the `Basic Information` tab
8. Copy the `Signing Secret`
