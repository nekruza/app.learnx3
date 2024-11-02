import OpenAI from "openai"
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources"

interface GptProps {
	model: string
	messages: {
		role: "assistant" | "user" | "system"
		content: string
	}[]
	temperature: number
	max_tokens: number
	presence_penalty?: number
	response_format?: {
		type: "json_schema"
		json_schema: any
	}
}

function OpenAiFina(prompt: GptProps & ChatCompletionCreateParamsNonStreaming) {
	const openai = new OpenAI({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
		dangerouslyAllowBrowser: true,
	})
	return openai.chat.completions.create(prompt)
}

export default OpenAiFina
