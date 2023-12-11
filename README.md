# Discord Chatbot with OpenAI api

This is a Discord chatbot that utilizes the GPT-3.5 model from OpenAI to generate responses to messages in a Discord channel.

## Prerequisites

Before running the chatbot, ensure you have the following prerequisites:

- Node.js (v14 or higher) installed on your machine.
- Discord bot token obtained from the Discord Developer Portal.
- OpenAI API key to access the GPT-3.5 model.

## Installation

To install and set up the chatbot, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Taner-Y-Banth/chatgpt-discord.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

To use the chatbot, follow these steps:

1. Configure the bot:

   - Open the `index.js` file.
   - Provide your OpenAI API key and Discord bot token:

     ```javascript
     const argv = minimist(process.argv.slice(2));
     // ...
     const configuration = new Configuration({
       apiKey: argv.openaiKey,
     });

     const openai = new OpenAIApi(configuration);

     // ...
     client.login(argv.discordToken);
     ```

2. Start the bot:

   ```bash
   OPENAI_API_KEY=YOUR_OPENAI_API_KEY DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN node index
   ```

   Replace `YOUR_OPENAI_API_KEY` with your OpenAI API key and `YOUR_DISCORD_BOT_TOKEN` with your Discord bot token.

3. Invite the bot to your Discord server using the generated OAuth2 URL.

4. In your Discord channel, use the following command to interact with the GPT-3.5 model:

   ```
   !code <your message>
   ```

   Replace `<your message>` with the text you want to send to the GPT-3.5 model.

The provided code sets up a Discord chatbot that listens for messages in a channel and responds with generated text from the model. It handles the `!code` command, which triggers the bot to generate a response based on the user's input.

Make sure to set env vars or replace the placeholders `YOUR_OPENAI_API_KEY` and `YOUR_DISCORD_BOT_TOKEN` with your actual OpenAI API key and Discord bot token, respectively.