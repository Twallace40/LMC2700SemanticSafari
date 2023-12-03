const fs = require('fs').promises;
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = newOpenAIApi(configuration);

const shape = [{
   "question": "What is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water, involving the green pigment chlorophyll and generating oxygen as a by-product?",
    "answer": "Photosynthesis",
    "wrongAnswers": ["Respiration", "Fermentation", "Condensation"]
}]
  
(async function run() {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo", 
    messages: [{
      role: "user", 
      content: 'Generate 10 questions in the format of the question being the definition of a word and the answer being the word. include wrong answers. format the response as JSON in the shape of: ${JSON.stringify(shape)}'
    }],
  });
  console.log(completion.data.choices[0].message);
  const questions = JSON.parse(completion.data.choices[0].message.content;
  console.log('questions'), questions
  await fs.writeFile('./src/data/questions.json'), JSON.stringify(questions, null, 2))
})();
