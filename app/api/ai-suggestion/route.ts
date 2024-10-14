// pages/api/generate-audio.js
import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
})

export async function POST(request: Request) {
	const { prompt } = await request.json()

	try {
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content: `Provide one suggestion for the next response based on the conversation: ${prompt}. Suggestion should be an example, so the user could respond to the question.`,
				},
			],
			model: "gpt-4o-mini",
			temperature: 0.7,
			max_tokens: 200,
		})

		const suggestionFromGPT = completion.choices[0].message.content || ""
		if (!suggestionFromGPT) {
			return NextResponse.json({ message: "Failed to generate audio" }, { status: 400 })
		}

		return NextResponse.json(
			{
				suggestionFromGPT,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error generating the audio file:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
