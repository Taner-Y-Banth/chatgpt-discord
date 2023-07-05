import Discord from 'discord.js';
import { Configuration, OpenAIApi } from 'openai';
import minimist from 'minimist';

// Parse command-line arguments
const argv = minimist(process.argv.slice(2));

// Create a new Discord client with the required intents
const client = new Discord.Client({ intents: 32509 });

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
  console.log("message")
  // Ignore messages from bots
  if (message.author.bot) return;

  // Ignore messages that don't start with a specific prefix
  const prefix = '!'; // Customize the prefix as needed
  if (!message.content.startsWith(prefix)) return;

  // Extract the command and arguments from the message content
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Handle specific commands
  if (command === 'gpt') {
    try {
      // Join the arguments into a single input string
      const input = args.join(' ');

      console.log(input);

      // Make the request to the GPT-4 model
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: input}],
      });
      let response = completion.data.choices[0].message;

      // Send the GPT's response back to the Discord channel
      message.channel.send(response.choices[0].text);
    } catch (error) {
      console.error('Error:', error);
      message.channel.send('An error occurred while processing your request.');
    }
  }
});

// Log in to Discord using your bot token
client.login(argv.discordToken);
