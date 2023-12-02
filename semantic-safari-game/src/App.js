import { useState } from "react";
import OpenAI from "openai";

const App = () => {
	const openai = new OpenAI({
		apiKey: "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",
	});
	const [prompt, setPrompt] = useState("");
	const [apiResponse, setApiResponse] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const result = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: prompt,
				temperature: 0.5,
				max_tokens: 4000,
			});
			//console.log("response", result.data.choices[0].text);
			setApiResponse(result.data.choices[0].text);
		} catch (e) {
			//console.log(e);
			setApiResponse("Something is going wrong, Please try again.");
		}
		setLoading(false);
	};

	return (
		<div className="background flex w-screen h-screen bg-[#DAC69A] items-center justify-center">
			<form onSubmit={handleSubmit}>
				<textarea
					type="text"
					value={prompt}
					placeholder="Please ask to openai"
					onChange={(e) => setPrompt(e.target.value)}
				></textarea>
				<button disabled={loading || prompt.length === 0} type="submit">
					{loading ? "Generating..." : "Generate"}
				</button>
			</form>
			{apiResponse && (
				<div className="flex justify-center">
					<pre>
						<strong>API response:</strong>
						{apiResponse}
					</pre>
				</div>
			)}
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
};

export default App;
