import { Avatar, Box, Typography } from "@mui/material"
import TextToSpeechButton from "../components/speakpage/TextToSpeechButton"

export const UserMessage = ({ text, userGender }: { text: string; userGender: string }) => (
	<Box
		//@ts-ignore
		sx={{ display: "flex", alignItems: "center" }}
	>
		<TextToSpeechButton text={text} buttonSize="25px" personType="male" />
		<Typography sx={{ fontSize: 14, color: "#323331" }}> {text} </Typography>
		<Avatar
			sx={{ width: 30, height: 30, ml: 2, border: "2px solid #5f61c4" }}
			alt="professor"
			src={userGender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
		/>
	</Box>
)
