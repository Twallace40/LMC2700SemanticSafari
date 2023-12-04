const fs = require("fs");
// const { Configuration, OpenAIApi, OpenAI } = require("openai");

// // const configuration = new Configuration({
// // 	apiKey: "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",
// // });
// // const openai = new OpenAIApi(configuration);

// const openai = new OpenAI({
// 	apiKey: "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",
// });

// const shape = [
// 	{
// 		question:
// 			"What is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water, involving the green pigment chlorophyll and generating oxygen as a by-product?",
// 		answer: "Photosynthesis",
// 		wrongAnswers: ["Respiration", "Fermentation", "Condensation"],
// 	},
// ](async function run() {
// 	const completion = await openai.createChatCompletion({
// 		model: "gpt-3.5-turbo",
// 		messages: [
// 			{
// 				role: "user",
// 				content: {
// 					question:
// 						"Generate 10 questions in the format of the question being the definition of a word and the answer being the word. include wrong answers. format the response as JSON in the shape of:",
// 					shape: JSON.stringify(shape),
// 				},
// 			},
// 		],
// 	});
// 	console.log(completion.data.choices[0].message);
// 	const questions = JSON.parse(completion.data.choices[0].message.content);
// 	console.log("questions");
// 	await fs.writeFile(
// 		"./src/questions.json",
// 		JSON.stringify(questions, null, 2)
// 	);
// })();

var APIBody = {
	model: "gpt-3.5-turbo",
	messages: [
		{
			role: "system",
			content: `"Generate 10 questions in the format of the question being the definition of a word and the answer being the word. include wrong answers. format the response as JSON in the shape of: 
      {question: "What is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water, involving the green pigment chlorophyll and generating oxygen as a by-product?",
      answer: "Photosynthesis",
      wrongAnswers: ["Respiration", "Fermentation", "Condensation"]}
  `,
		},
		{
			role: "user",
			content: `
  Give back a comma separated list.
  `,
		},
	],
	temperature: 1,
	max_tokens: 1000,
	// top_p: 0.5,
};

fetch("https://api.openai.com/v1/chat/completions", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Authorization:
			"Bearer " + "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",
	},
	body: JSON.stringify(APIBody),
})
	.then((data) => {
		return data.json();
	})
	.then((data) => {
		console.log(data);
		// const questions = JSON.parse(data.choices[0].message.content);
		// console.log("questions");
		fs.writeFile("./src/questions.json", JSON.stringify(data, null, 2));
	});
