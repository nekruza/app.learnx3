"use client"
import { useChatStore, useStoreFilePath, useSuggestionsStore } from "../zustand"
import axios from "axios"
import OpenAI from "openai"
import { getFunctions, httpsCallable } from "@firebase/functions"

function useSpeakAI() {
	const { setAiFilePath } = useStoreFilePath()
	const { messages, addMessage } = useChatStore()
	const { addSuggestion } = useSuggestionsStore()

	let messageFromGPT = []
	async function Speak(myFilePath: string) {
		// Delete the previous AI audio file
		try {
			setAiFilePath(null)

			const audioFunc = httpsCallable(getFunctions(), "downloadaudio")

			const audioData = await audioFunc({ audioFilePath: myFilePath })

			// Convert the byte array to a Uint8Array
			const byteArray = new Uint8Array(Object.values(audioData.data as Uint8Array))

			// Create a Blob from the Uint8Array
			const blob = new Blob([byteArray], { type: "audio/wav" })
			const formData = new FormData()
			formData.append("model", "whisper-1")
			formData.append("file", blob, "audio.wav") // Provide a filename for the audio file
			formData.append("response_format", "text")

			// Send the request to OpenAI using fetch
			const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
				headers: {
					Authorization: "Bearer " + process.env.NEXT_PUBLIC_OPENAI_KEY,
				},
				method: "POST",
				body: formData,
			})
			const voiceText = await res.text()

			// Add the user message to the chat
			messageFromGPT = [...messages, { role: "user", content: voiceText }]
			addMessage(messageFromGPT)
			addSuggestion("")

			// Get message from ChatGPT and generate audio from the text
			const response = await axios.post(
				"/api/ai-speech",
				{
					messages: messageFromGPT,
					currentTime: new Date().getTime(),
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			if (response.status === 200) {
				const { data } = await response
				setAiFilePath(data.filePath)
				addMessage([
					...messageFromGPT,
					{
						role: "assistant",
						content: data.messageFromGPT,
					},
				])
			} else {
				console.error("Failed to generate audio")
				setAiFilePath(null)
			}
		} catch (e) {
			setAiFilePath(null)
			console.log("error", e)
		}
	}

	return {
		Speak,
	}
}

export default useSpeakAI
