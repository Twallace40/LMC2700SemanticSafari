const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors()); // Enable CORS

app.use(bodyParser.json());

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.post('/api/generate-questions', async (req, res) => {
  try {
    // New prompt structure asking for a question with multiple choices
    const prompt = 'Generate a multiple-choice question and provide four options.';
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
    });

    // Extract the generated text
    const generatedText = completion.data.choices[0].text.trim();
    
    // Here you would parse the generatedText to separate the question from the options
    // The parsing logic will depend on the structure of the generatedText.
    // Since the AI does not know which is the correct answer, you would have to designate one.
    // For example, if the output is structured with the question followed by four options, you might do:

    // Split the text by newline to separate the question and options
    const lines = generatedText.split('\n');
    const question = lines[0];
    const options = lines.slice(1); // This assumes the options follow the question and are on separate lines

    // Randomly select a correct answer
    const correctIndex = Math.floor(Math.random() * options.length);
    const correctAnswer = options[correctIndex];

    const quizQuestion = {
      definition: question,
      options: options,
      correctAnswer: correctAnswer,
    };

    res.json({ question: quizQuestion });
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
