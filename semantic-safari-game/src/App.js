import React, { useState, useEffect } from "react";
import questionsData from "./questionBank.json"; // Adjust the path as needed
import giraffeImage from "./assets/giraffe.png";
import monkeyImage from "./assets/monkey new.png";
import leafImage from "./assets/leaf 1.png";

const App = () => {
	const [question, setQuestion] = useState({
		definition: "",
		options: [],
		correctAnswer: "",
	});
	const [score, setScore] = useState(0);
	const [timer, setTimer] = useState(60);
	const [boost, setBoost] = useState(10);
	const [running, setRunning] = useState(false);

	useEffect(() => {
		fetchQuestion();
	}, []);

	const shuffleOptions = (options) => {
		for (let i = options.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[options[i], options[j]] = [options[j], options[i]];
		}
		return options;
	};

	const fetchQuestion = () => {
		const randomIndex = Math.floor(Math.random() * questionsData.length);
		const newQuestion = questionsData[randomIndex];
		const options = shuffleOptions([
			newQuestion.answer,
			...newQuestion.wrongAnswers,
		]);
		setQuestion({
			definition: newQuestion.question,
			options: options,
			correctAnswer: newQuestion.answer,
		});
	};

	const handleAnswerClick = (selectedAnswer) => {
		const isCorrect =
			selectedAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
		if (isCorrect) {
			setScore(score + 10 + boost);
		}
		fetchQuestion();
		setBoost(10);
	};

	const handleGameStatus = () => {
		setRunning(!running);
		if (!running) {
			setScore(0);
			setTimer(60);
			setBoost(10);
			fetchQuestion();
		}
	};

	useEffect(() => {
		let timerInterval;
		if (running && timer > 0) {
			timerInterval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else if (!running || timer === 0) {
			clearInterval(timerInterval);
		}
		return () => clearInterval(timerInterval);
	}, [running, timer]);

	useEffect(() => {
		let boostInterval;
		if (running && boost > 0) {
			boostInterval = setInterval(() => {
				setBoost((prevBoost) => prevBoost - 1);
			}, 1000);
		} else {
			clearInterval(boostInterval);
		}
		return () => clearInterval(boostInterval);
	}, [running, boost]);

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
						{running && timer > 0 ? (
							<p
								id="question"
								className="text-3xl font-semibold justify-self-start px-8"
							>
								{question.definition} {/* Displaying the current question */}
							</p>
						) : timer === 0 ? (
							<p className="text-3xl font-semibold justify-self-start">
								GAME OVER
							</p>
						) : (
							<p className="text-3xl font-semibold justify-self-start">
								Welcome!
							</p>
						)}
						<p id="score" className="text-3xl font-semibold justify-self-end">
							Score: {score}
						</p>
					</div>
					<div className="flex flex-col h-full items-center justify-center">
						<h1 className="mb-2 font-medium">Boost</h1>
						<div className="flex w-8 h-full border-2 border-black items-end">
							{running && timer > 0 && (
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
							{running && timer > 0 && (
								<p id={`answer${index + 1}`} className="text-3xl font-semibold">
									{option} {/* Displaying each option */}
								</p>
							)}
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
