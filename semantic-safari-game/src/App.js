import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OPENAI_API_KEY from './config/openai.js';
function App() {
  const [response, setResponse] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt: 'Once upon a time',
            max_tokens: 100,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );
        setResponse(response.data.choices[0].text);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>OpenAI React Demo</h1>
      <p>{response}</p>
    </div>
  );
}
export default App;