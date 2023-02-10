import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(
            req.body.text
        ),
        temperature: 0.7,
        max_tokens: 3000
    });
    console.log(completion.data);
    res.status(200).json({
        result: completion.data.choices[0].text.match(/\[.*?\]/g).map(text => text.replace(/[\[\]]/g, '')),
    });
}

const generatePrompt = (text) => {
    console.log(text);
    return `"${text}" "list every medical assertion that would require a citation, contain each within square brackets, ignore statements that are common sense" `;
};