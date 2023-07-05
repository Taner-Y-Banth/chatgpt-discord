import { Client } from 'discord.js';
import { Configuration, OpenAIApi } from 'openai';
import minimist from 'minimist';

// Parse command-line arguments
const argv = minimist(process.argv.slice(2));

// Create a new Discord client with the required intents
const client = new Client();

const configuration = new Configuration({
  apiKey: argv.openaiKey,
});

const openai = new OpenAIApi(configuration);

// Event triggered when the client is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Event triggered when a message is received
client.on('message', async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Ignore messages that don't start with a specific prefix
  const prefix = '!'; // Customize the prefix as needed
  if (!message.content.startsWith(prefix)) return;

  // Extract the command and arguments from the message content
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Function to retrieve previous messages from a Discord channel
  async function getPreviousMessages(channel, limit) {
    try {
      const messages = await channel.messages.fetch({ limit: limit });
      return messages.map((message) => ({
        role: 'user',
        content: message.content
      }));
    } catch (error) {
      console.error('Error retrieving previous messages:', error);
      return [];
    }
  }

  // Command handler
  if (command === 'code') {
    try {
      // Join the arguments into a single input string
      let input = args.join(' ');

      console.log(`USER INPUT: ${input}`);

      // Retrieve previous messages from the channel
      let previousMessages = await getPreviousMessages(message.channel, 10); // Fetch the last 10 messages from the channel

      // Append previous messages and user input to the messages array
      const messages = [
        { role: 'system', content: 'You are a helpful assistant specializing in code' },
        ...previousMessages,
        { role: 'user', content: input }
      ];

      // Make the request to the GPT-4 model
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo', // Replace with the desired model version
        messages: messages,
      });
      let response = completion.data.choices[0].message.content;

      console.log(`RESPONSE COMPLETED, LENGTH: ${response.length}`);

      // Split the response into chunks
      const chunks = response.match(/[\s\S]{1,2000}/g) || [];

      // Send each chunk to the Discord channel
      for (const chunk of chunks) {
        message.channel.send(chunk);
      }
    } catch (error) {
      console.error('Error:', error);
      message.channel.send('An error occurred while processing your request.');
    }
  }
});

// Log in to Discord using your bot token
client.login(argv.discordToken);
