const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: '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' });

app.post('/api/generate-questions', async (req, res) => {
  try {
    const prompt = 'Generate a quiz question with four options, where only one option is correct:';
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100
    });

    const generatedContent = completion.choices[0].text.trim().split('\n');
    const generatedQuestion = generatedContent[0];
    const options = generatedContent.slice(1, 5); // Assumes options are formatted in lines after the question
    // Here, you need to identify the correct answer. This will depend on how the answers are formatted in the response.

    const quizQuestion = {
      definition: generatedQuestion,
      options: options,
      correctAnswer: /* Logic to determine the correct answer */
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
