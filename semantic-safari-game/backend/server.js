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
    // New prompt structure asking for a question followed by multiple choices
    const prompt = 'Generate a multiple-choice question with one correct answer and three plausible but incorrect answers. List the answers as options A, B, C, and D.';
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
    });

    // Extract the generated text
    const generatedText = completion.data.choices[0].text.trim();
    
    // TODO: Parse the generatedText to separate the question and the answer choices.
    // This parsing logic will depend on the structure of the generatedText.
    // You may need to manually identify the correct and incorrect answers based on the structure.

    // For now, return the generatedText to the client for demonstration
    res.json({ generatedText: generatedText });
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
