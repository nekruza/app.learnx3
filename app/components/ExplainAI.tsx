import { Box, Button, IconButton } from "@mui/material"
import { useState } from "react"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
import ClearIcon from "@mui/icons-material/Clear"
import OpenAiFina from "./utils/OpenAiFina"

function ExplainAI({ prompt, buttonTitle, bg }: { prompt: string; buttonTitle: string; bg?: string }) {
	const [result, setResult] = useState("")
	const [loading, setLoading] = useState(false)

	const handleClick = async () => {
		setLoading(true)
		try {
			const response = await OpenAiFina({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "system",
						content: "You are english language teacher and you explain things in simple language so everyone can learn",
					},
					{
						role: "user",
						content: "Explain me past tense in simple language",
					},
					{
						role: "assistant",
						content: `Past tense is a way of talking about things that happened in the past. We usually form the past tense of regular verbs by adding "-ed" to the end of the verb. For example, "walk" becomes "walked" in the past tense. However, some verbs are irregular and don't follow this rule. For example, "/go" becomes "went" in the past tense.`,
					},
					{
						role: "user",
						content: prompt,
					},
				],
				temperature: 0.7,
				max_tokens: 800,
				presence_penalty: 0,
			})
			setResult(response.choices[0].message.content ?? "Sorry, something went wrong. Please try again later.")
			setLoading(false)
		} catch (error) {
			console.error(error)
			setLoading(false)
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "start",
				background: bg || "white",
				borderRadius: "7px",
				marginBottom: "10px",
			}}
		>
			<Box
				sx={{
					position: "relative",
					padding: 1,
				}}
			>
				{result.length > 0 && (
					<Box
						sx={{
							position: "absolute",
							right: 5,
							color: "black",
							cursor: "pointer",
						}}
						onClick={() => setResult("")}
					>
						<IconButton>
							<ClearIcon />
						</IconButton>
					</Box>
				)}
				<Button
					variant="contained"
					onClick={handleClick}
					disabled={loading}
					sx={{
						background: "rgb(50, 51, 49)",
						color: "white",
						fontWeight: "bold",
						fontSize: "12px",
					}}
				>
					<AutoFixHighIcon sx={{ marginRight: "10px" }} /> {loading ? "Loading..." : buttonTitle}
				</Button>

				<Box
					sx={{
						width: "100%",
						minHeight: "100%",
						color: "black",
						margin: "20px 2px",
					}}
				>
					<p
						dangerouslySetInnerHTML={{
							__html: result.replace(/\n/g, "<br />"),
						}}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default ExplainAI
