export const InitialAIMessage = [
	{
		role: "user" as const,
		parts: [{ text: "Good morning, teacher! How are you today?" }],
	},
	{
		role: "model" as const,
		parts: [{ text: "Good morning! I'm doing well, thank you. How about you? How was your evening?" }],
	},
	{
		role: "user" as const,
		parts: [
			{ text: "I'm doing great, thank you for asking. My evening was good. I spent some time doing my homework." },
		],
	},
]
