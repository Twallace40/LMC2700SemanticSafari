import React, { useState, useEffect } from "react";
import giraffeImage from "./assets/giraffe.png";
import monkeyImage from "./assets/monkey new.png";
import leafImage from "./assets/leaf 1.png";

const App = () => {
	const [question, setQuestion] = useState({
		definition: "This is an example definition.",
		options: ["option1", "option2", "option3", "option4"],
		correctAnswer: "",
	});

	const [score, setScore] = useState(0);
	const [timer, setTimer] = useState(60);
	const [boost, setBoost] = useState(10);
	const [running, setRunning] = useState(false);

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
		const isCorrect =
			selectedAnswer.toLocaleLowerCase() ===
			question.correctAnswer.toLocaleLowerCase();

		// Update the score based on the correctness of the answer
		// setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
		isCorrect && setScore(score + 10 + boost);

		// Fetch the next question after handling the answer (if needed)
		fetchQuestion();

		//Reset boost timer
		setBoost(10);
	};

	const handleGameStatus = () => {
		if (running) {
			setRunning(false);
			setScore(0);
			setTimer(60);
			setBoost(10);
		} else {
			// startTimer();
			// startBoostTimer();
			setRunning(true);
		}
	};

	useEffect(() => {
		let timerInterval;
		if (running) {
			timerInterval = setInterval(() => {
				setTimer((prevTimer) => {
					if (prevTimer > 0) {
						return prevTimer - 1;
					} else {
						return 0;
					}
				});
			}, 1000);
		} else {
			clearInterval(timerInterval);
		}
		return () => clearInterval(timerInterval);
	}, [running]);

	useEffect(() => {
		let boostInterval;
		if (running) {
			boostInterval = setInterval(() => {
				setBoost((prevBoost) => {
					if (prevBoost > 0) {
						return prevBoost - 1;
					} else {
						return 0;
					}
				});
			}, 1000);
		} else {
			clearInterval(boostInterval);
		}
		return () => clearInterval(boostInterval);
	}, [running]);

	return (
		<div className="background flex w-screen h-screen bg-[#DAC69A] z-0">
			<div className="flex flex-col h-full justify-between">
				<img
					src={leafImage}
					className="w-[148px] h-[152px] z-10 self-end transform -scale-x-100 m-4"
				/>
				<img
					src={giraffeImage}
					className="w-[148px] h-[200px] z-10 rotate-[-12deg] transform -scale-x-100 mb-8"
				/>
			</div>
			<div className="content z-20 flex flex-col w-[70%] h-[70%] gap-[10%] self-center mx-auto">
				<div
					className={`gameDisplay z-10 flex w-[100%] h-[70%] p-4 border-4 border-black items-center justify-center ${
						timer === 0 ? "bg-red-400" : "bg-white"
					}`}
				>
					<div className="flex flex-col h-full items-center justify-center">
						<h1 className="mb-2 font-medium">Timer</h1>
						<div className="flex w-8 h-full border-2 border-black items-end">
							<div
								className="w-full bg-yellow-300"
								style={{
									height: `${(timer / 60) * 100}%`,
									transition: "height 1s linear",
								}}
							></div>
						</div>
					</div>
					<div className="flex flex-col w-full h-full items-center justify-between">
						<button
							className={`flex w-[50%] h-[12%] border-4 border-black items-center justify-center cursor-pointer text-xl font-semibold text-white ${
								running ? "bg-red-500" : "bg-green-600"
							}`}
							onClick={handleGameStatus}
						>
							{running ? "END GAME" : "START GAME"}
						</button>
						{timer > 0 ? (
							<p
								id="question"
								className="text-3xl font-semibold justify-self-start"
							>
								{question.definition}
							</p>
						) : (
							<p className="text-3xl font-semibold justify-self-start">
								GAME OVER
							</p>
						)}
						<p id="score" className="text-3xl font-semibold justify-self-end">
							Score: {score}
						</p>
					</div>
					<div className="flex flex-col h-full items-center justify-center">
						<h1 className="mb-2 font-medium">Boost</h1>
						<div className="flex w-8 h-full border-2 border-black items-end">
							{timer > 0 && (
								<div
									className="w-full bg-orange-400"
									style={{
										height: `${(boost / 10) * 100}%`,
										transition: "height 1s linear",
									}}
								></div>
							)}
						</div>
					</div>
				</div>
				<div className="answers w-[100%] h-[30%] grid grid-cols-2 grid-rows-2 gap-8">
					{question.options.map((option, index) => (
						<button
							key={index}
							className="flex border-4 border-black bg-white items-center justify-center"
							onClick={() => handleAnswerClick(option)}
						>
							<p id={`answer1${index + 1}`} className="text-3xl font-semibold">
								{option.toLocaleLowerCase()}
							</p>
						</button>
					))}
				</div>
			</div>
			<div className="flex flex-col h-full justify-between">
				<img src={monkeyImage} className="w-[148px] h-[152px] z-10" />
				<img src={leafImage} className="w-[148px] h-[152px] z-10 self-end" />
			</div>
		</div>
	);
};

export default App;
