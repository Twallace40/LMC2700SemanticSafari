// src/components/QuizGame.js

import React, { useState, useEffect } from "react";

const App = () => {
	const [question, setQuestion] = useState({
		definition: "This is an example definition.",
		options: ["option1", "option2", "option3", "option4"],
		correctAnswer: "",
	});

	const [score, setScore] = useState(0);
	const [timer, setTimer] = useState(60);
	const [boost, setBoost] = useState(5);

	useEffect(() => {
		fetchQuestion();
	}, []);

	const fetchQuestion = async () => {
		try {
			const response = await fetch(
				"http://localhost:3001/api/generate-questions",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Error fetching question");
			}

			const data = await response.json();
			setQuestion(data.question);
		} catch (error) {
			console.error("Error fetching question:", error);
		}
	};

	const handleAnswerClick = (selectedAnswer) => {
		// Check if the selected answer is correct
		const isCorrect = selectedAnswer === question.correctAnswer;

		// Update the score based on the correctness of the answer
		setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));

		// Fetch the next question after handling the answer (if needed)
		fetchQuestion();
	};

	return (
		<div className="background flex w-screen h-screen bg-[#DAC69A] items-center justify-center">
			<div className="content flex flex-col w-[60%] h-[70%] gap-[10%] items-center justify-center">
				<div className="gameDisplay flex w-[100%] h-[70%] p-4 border-4 border-black bg-white items-center justify-center">
					<div className="flex flex-col h-full items-center justify-center">
						<h1 className="mb-2">Timer</h1>
						<div className="w-4 h-full bg-black"></div>
					</div>
					<div className="flex flex-col w-full h-full items-center justify-between">
						<p
							id="question"
							className="text-3xl font-semibold justify-self-start mt-8"
						>
							{question.definition}
						</p>
						<p id="score" className="text-3xl font-semibold justify-self-end">
							Score: {score}
						</p>
					</div>
					<div className="flex flex-col h-full items-center justify-center">
						<h1 className="mb-2">Boost</h1>
						<div className="w-4 h-full bg-black"></div>
					</div>
				</div>
				<div className="answers w-[100%] h-[30%] grid grid-cols-2 grid-rows-2 gap-8">
					{question.options.map((option, index) => (
						<button
							key={index}
							className="flex border-4 border-black bg-white items-center justify-center cursor-pointer"
							onClick={() => handleAnswerClick(option)}
						>
							<p id={`answer1${index + 1}`} className="text-3xl font-semibold">
								{option}
							</p>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default App;
