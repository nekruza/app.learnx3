import { Avatar, Box } from "@mui/material"
import ReactMarkdown from "react-markdown"
import { MarkdownComponents } from "./MarkdownComponents"
import TextToSpeechButton from "../components/speakpage/TextToSpeechButton"

export const AIMessage = ({ text }: { text: string }) => (
	<Box
		//@ts-ignore
		sx={{ display: "flex", alignItems: "center" }}
	>
		<Avatar
			sx={{ width: 35, height: 35, mr: 2, border: "2px solid #5f61c4" }}
			alt="professor"
			src="/teacher-johny.png"
		/>
		<Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
			<ReactMarkdown components={MarkdownComponents}>{text}</ReactMarkdown>
		</Box>
		<TextToSpeechButton text={text} buttonSize="25px" personType="female" />
	</Box>
)
