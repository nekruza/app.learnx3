// pages/api/generate-audio.js
import OpenAI from "openai"
import fs from "fs"
import { NextResponse } from "next/server"

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
})

export async function POST(request: any) {
	const { myFilePath } = await request.json()

	try {
		const transcription = await openai.audio.transcriptions.create({
			file: fs.createReadStream(`public/${myFilePath}`),
			model: "whisper-1",
		})

		return NextResponse.json(
			{
				text: transcription.text,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error generating the audio file:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
