import { config } from "dotenv";
import readline from "readline"

config();

console.log(process.env.API_KEY);

// const { Configuration, OpenAIApi } = require("openai");
import { Configuration,OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

userInterface.prompt();
userInterface.on("line", async input =>{
    const res = await openai.createChatCompletion({
        model : "gpt-3.5-turbo",
        messages:[{
            role:"user",
            content : input
        }]
    })
    console.log(res.data.choices[0].message.content);
    userInterface.prompt();
})


// openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages:[{
//     role:"user",
//     content : "I am giving input using JS"
//   }]
// }).then(res =>{
//     console.log(res.data.choices[0].message.content);
// })