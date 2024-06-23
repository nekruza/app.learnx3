import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { toFile } from "openai/uploads"
import { Readable } from "stream"

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
})

export async function POST(request: NextRequest) {
	try {
		// const { myFilePath } = await request.json()

		const myFilePath =
			"https://storage.googleapis.com/educatex-45e0d.appspot.com/audios/user_2hPqsPs964iQlz0z0BlOT8JcDDC/ai-speech-1718989355539-user_2hPqsPs964iQlz0z0BlOT8JcDDC.mp3"
		const audioArrayBuffer = await fetch(myFilePath).then((res) => res.arrayBuffer())
		const audioBuffer = Buffer.from(audioArrayBuffer)

		const convertedAudio = await toFile(Readable.from(audioBuffer), "audio.mp3")

		const transcription = await openai.audio.transcriptions.create({
			file: convertedAudio,
			model: "whisper-1",
			response_format: "text",
		})

		return NextResponse.json(
			{
				text: transcription,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error generating the audio file:", error)
		return NextResponse.json({ message: error }, { status: 500 })
	}
}
