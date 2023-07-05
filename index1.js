import { Configuration, OpenAIApi } from "openai";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const configuration = new Configuration({
  apiKey: argv.openaiKey,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: prompt}],
});
console.log(completion.data.choices[0].message);
