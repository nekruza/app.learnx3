"use client"
import { useChatStore, useStoreFilePath, useSuggestionsStore } from "../zustand"
import axios from "axios"

function useSpeakAI() {
	const { setAiFilePath } = useStoreFilePath()
	const { messages, addMessage } = useChatStore()
	const { addSuggestion } = useSuggestionsStore()

	let messageFromGPT = []
	async function Speak(myFilePath: string) {
		// Delete the previous AI audio file
		try {
			setAiFilePath(null)

			const { data } = await axios.post("/api/speech-to-text", {
				myFilePath,
			})

			// Add the user message to the chat
			messageFromGPT = [...messages, { role: "user", content: data.text, voice: myFilePath }]
			addMessage(messageFromGPT) // Add the user message to the chat
			addSuggestion("")

			// Get message from ChatGPT and generate audio from the text
			const response = await axios.post(
				"/api/ai-speech",
				{
					messages: messageFromGPT,
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
						voice: data.filePath,
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
