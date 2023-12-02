import React, { useEffect, useState } from "react";
import axios from "axios";
import OPENAI_API_KEY from "./config/openai.js";
function App() {
	const [response, setResponse] = useState("");
	useEffect(() => {
		// const fetchData = async () => {
		// 	try {
		// 		const response = await axios.post(
		// 			"https://api.openai.com/v1/engines/davinci-codex/completions",
		// 			{
		// 				prompt: "Once upon a time",
		// 				max_tokens: 100,
		// 			},
		// 			{
		// 				headers: {
		// 					"Content-Type": "application/json",
		// 					Authorization: `Bearer ${OPENAI_API_KEY}`,
		// 				},
		// 			}
		// 		);
		// 		setResponse(response.data.choices[0].text);
		// 	} catch (error) {
		// 		console.error("Error:", error);
		// 	}
		// };
		// fetchData();
	}, []);

	return (
		<div className="background flex w-screen h-screen bg-[#DAC69A] items-center justify-center">
			<p>{response}</p>
			<div className="content flex flex-col w-[60%] h-[70%] gap-[10%] items-center justify-center">
				<div className="questions w-[100%] h-[70%] border-4 border-black bg-white"></div>
				<div className="answers w-[100%] h-[30%] grid grid-cols-2 grid-rows-2 gap-8">
					<div
						id="answer1Container"
						className="flex border-4 border-black bg-white items-center justify-center"
					>
						<p id="answer1" className="text-3xl font-semibold">
							Test
						</p>
					</div>
					<div
						id="answer2Container"
						className="flex border-4 border-black bg-white items-center justify-center"
					>
						<p id="answer2" className="text-3xl font-semibold">
							Test
						</p>
					</div>
					<div
						id="answer3Container"
						className="flex border-4 border-black bg-white items-center justify-center"
					>
						<p id="answer3" className="text-3xl font-semibold">
							Test
						</p>
					</div>
					<div
						id="answer4Container"
						className="flex border-4 border-black bg-white items-center justify-center"
					>
						<p id="answer4" className="text-3xl font-semibold">
							Test
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default App;
