const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors()); // Enable CORS

app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: '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' });

app.post('/api/generate-questions', async (req, res) => {

  try {
    const prompt = 'Generate a quiz question: ';
    const completion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
      });

    // Extract the generated question from the API response
    const generatedQuestion = completion.choices[0].text.trim();

    // For simplicity, use a static set of answer choices
    const options = ['Choice A', 'Choice B', 'Choice C', 'Choice D'];
    const correctAnswer = options[Math.floor(Math.random() * options.length)];

    const quizQuestion = {
      definition: generatedQuestion,
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
