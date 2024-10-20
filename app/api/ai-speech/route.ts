// pages/api/generate-audio.js
import OpenAI from "openai"
import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/components/firebaseX"

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
})

export async function POST(request: any) {
	const { messages } = await request.json()

	try {
		const completion = await openai.chat.completions.create({
			messages: messages,
			model: "gpt-4o-mini",
			temperature: 0.7,
			max_tokens: 300,
		})

		const messageFromGPT = completion.choices[0].message.content || ""
		if (!messageFromGPT) {
			return NextResponse.json({ message: "Failed to generate audio" }, { status: 400 })
		}
		const mp3 = await openai.audio.speech.create({
			model: "tts-1",
			voice: "alloy",
			input: messageFromGPT,
		})

		const buffer = Buffer.from(await mp3.arrayBuffer())
		const currentTime = new Date().getTime()
		const { userId } = getAuth(request)
		const uniqueFileName = `ai-speech-${currentTime}-${userId}.mp3`
		const audioRef = ref(storage, `audios/${userId}/${uniqueFileName}`)

		await uploadBytes(audioRef, buffer)
		const audioURL = await getDownloadURL(audioRef)

		return NextResponse.json(
			{
				message: "Audio file saved",
				filePath: audioURL,
				messageFromGPT,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error generating the audio file:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
