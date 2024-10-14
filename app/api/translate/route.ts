// pages/api/generate-audio.js
import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
})

export async function POST(request: Request) {
	const { text, targetLanguage } = await request.json()

	if (!text || !targetLanguage) {
		return NextResponse.json({ message: "Text and target language are required" }, { status: 400 })
	}

	try {
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content: `Translate the following text to ${targetLanguage}: ${text}`,
				},
			],
			model: "gpt-4o-mini",
			temperature: 0.2,
			max_tokens: 200,
		})

		const translatedText = completion.choices[0].message.content || ""

		return NextResponse.json(
			{
				translatedText,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error generating the audio file:", error)
		return NextResponse.json({ message: "Failed to translate the text." }, { status: 500 })
	}
}
