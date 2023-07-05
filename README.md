# Discord Chatbot with GPT-4

This is a Discord chatbot that interacts with the GPT-4 model from OpenAI. The bot listens to messages in a Discord channel and responds with generated text using the GPT-4 model.

## Prerequisites

- Node.js (v14 or higher)
- Discord bot token
- OpenAI API key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/discord-gpt4-bot.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Configure the bot:

   - Open the `index.js` file.
   - Provide your OpenAI API key and Discord bot token:
   
     ```javascript
     const argv = minimist(process.argv.slice(2));
     // ...
     const gpt = new ChatGPT({
       apiKey: argv.openaiKey,
       model: 'gpt-4.0', // or any other GPT-4 model name
     });
     // ...
     client.login(argv.discordToken);
     ```

2. Start the bot:

   ```bash
   node index --openaiKey=YOUR_OPENAI_API_KEY --discordToken=YOUR_DISCORD_BOT_TOKEN
   ```

   Replace `YOUR_OPENAI_API_KEY` with your OpenAI API key and `YOUR_DISCORD_BOT_TOKEN` with your Discord bot token.

3. Invite the bot to your Discord server using the generated OAuth2 URL.

4. In your Discord channel, use the following command to interact with the GPT-4 model:

   ```
   !gpt <your message>
   ```

   Replace `<your message>` with the text you want to send to the GPT-4 model.