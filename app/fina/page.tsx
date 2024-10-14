"use client"
import { createRef, useEffect, useState } from "react"
import { auth } from "@/components/firebaseX"
import { styled, alpha, useTheme } from "@mui/material/styles"
import { Avatar, Box, Button, Grid, IconButton, Typography, useMediaQuery } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import InputBase from "@mui/material/InputBase"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import dayjs from "dayjs"
import TextToSpeechButton from "@/components/speakpage/TextToSpeechButton"
import { useStoreTemporary, useStoreUser } from "@/components/zustand"
import DeleteIcon from "@mui/icons-material/Delete"
import OpenAiFina from "@/components/utils/OpenAiFina"
import { brandColors } from "@/components/utils/brandColors"

interface Message {
	role: "assistant" | "user" | "system"
	content: string
	order?: number
}
export default function Fina(props: any) {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const { userInfo } = useStoreUser()
	const [prompt, setPrompt] = useState("")
	const now = dayjs().format("MMM D, YYYY")
	const { botComponentWidth, setBotComponentWidth } = useStoreTemporary()
	const [messages, setMessages] = useState<Message[]>([
		{
			role: "assistant",
			content: ` Hi ${auth.currentUser?.displayName}! I am your AI tutor. How can I help you? 🙂`,
			order: 1,
		},
	])

	// handle messages
	const handleMessage = (incomingMessage: Message) => {
		setMessages((prevMessages) => [
			...prevMessages,
			{
				role: incomingMessage.role,
				content: incomingMessage.content,
				order: prevMessages.length + 1,
			},
		])
		setPrompt("")
	}

	// delete all messages
	const handleDelete = () => {
		setMessages([
			{
				role: "assistant",
				content: ` Hi ${auth.currentUser?.displayName || ""}! I am your AI tutor. How can I help you? 🙂`,
				order: 1,
			},
		])
	}

	const [loading, setLoading] = useState(false)
	const combinedMessages = [...GPTMessage, ...messages, { role: "user", content: prompt }]

	const messagesArray: Message[] = combinedMessages.map(({ order, ...rest }: Message & any) => rest) || []

	const handleClick = async (prompt: string) => {
		handleMessage({ role: "user", content: prompt })
		setLoading(true)
		try {
			const response = await OpenAiFina({
				model: "gpt-4o-mini",
				messages: messagesArray,
				temperature: 0.9,
				max_tokens: 200,
				presence_penalty: 0,
			})
			handleMessage({
				role: "assistant",
				content: response.choices[0].message.content || "Sorry, something went wrong. Please try again later.",
			})

			setLoading(false)
		} catch (error) {
			console.error(error)
			setLoading(false)
		}
	}

	//scroll to bottom
	const chatsRef = createRef() as any

	const scrollToBottom = () => {
		chatsRef.current.scrollTop = chatsRef.current.scrollHeight
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	return (
		<Box
			//@ts-ignore
			sx={{
				width: isSmallScreen ? "100vw" : botComponentWidth,
				height: "100vh",
				color: "white",
				transition: "all 0.3s ease-in-out",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexDirection: "column",
				background: "#271f4d",
				boxSizing: "border-box",
				overflow: "hidden",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					padding: "20px 10px 0px",
				}}
			>
				<IconButton
					sx={{ color: brandColors.iconGrey }}
					onClick={() => (isSmallScreen ? props.setOpen(false) : setBotComponentWidth(0))}
				>
					<KeyboardDoubleArrowRightIcon />
				</IconButton>
				<Typography sx={{ width: "100%", textAlign: "center", color: brandColors.iconGrey }}>{now}</Typography>
				<IconButton sx={{ color: brandColors.iconGrey }} onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>
			</Box>
			<Box sx={{ width: "100%", overflow: "scroll", height: "100%", padding: "20px 10px" }} ref={chatsRef}>
				<Grid spacing={1} container>
					{messages?.map((item, index) => (
						<Grid item xs={12} key={index}>
							<Box
								key={index}
								sx={{
									display: "flex",
									width: "100%",
									color: "#323331",
									justifyContent: (item.order && (item.order % 2 ? "start" : "end")) || "start",
								}}
							>
								<Box
									sx={{
										display: "flex",
										width: "fit-content ",
										m: "5px 10px",
										padding: "5px 10px",
										height: "fit-content",
										alignItems: "center",
										borderRadius: 2,
										maxWidth: "80%",
										background: "white",
										boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
									}}
								>
									{item.order && item.order % 2 ? (
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<Avatar
												sx={{ width: 35, height: 35, mr: 2, border: "2px solid #5f61c4" }}
												alt="professor"
												src="/teacher-johny.png"
											/>
											<p
												style={{ fontSize: 14, color: "#323331" }}
												dangerouslySetInnerHTML={{
													__html: item.content.replace(/\n/g, "<br />"),
												}}
											/>
											<TextToSpeechButton text={item.content} buttonSize="25px" personType="female" />
										</Box>
									) : (
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<TextToSpeechButton text={item.content} buttonSize="25px" personType="male" />
											<Typography sx={{ fontSize: 14, color: "#323331" }}> {item.content} </Typography>
											<Avatar
												sx={{ width: 30, height: 30, ml: 2, border: "2px solid #5f61c4" }}
												alt="professor"
												src={userInfo?.gender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
											/>
										</Box>
									)}
								</Box>
								{/* <TextToSpeechButton
									text={item.order % 2 ? item.content : item.content}
									buttonSize="25px"
									personType={item.order % 2 ? "female" : "male"}
								/> */}
							</Box>
						</Grid>
					))}
				</Grid>{" "}
			</Box>

			<BotFinaAI prompt={prompt} loading={loading} handleClick={handleClick} setPrompt={setPrompt} />
		</Box>
	)
}

const BotFinaAI = ({
	loading,
	prompt,
	handleClick,
	setPrompt,
}: {
	loading: boolean
	prompt: string
	handleClick: (text: string) => void
	setPrompt: React.Dispatch<React.SetStateAction<string>>
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				paddingTop: "12px",
				marginTop: 1,
				marginBottom: { xs: "130px", sm: "10px" },
				paddingLeft: { xs: "15px", sm: 0 },
				width: "100%",
			}}
		>
			<Search>
				<SearchIconWrapper>🤖</SearchIconWrapper>
				<StyledInputBase
					autoFocus
					placeholder="Ask your question here..."
					inputProps={{ "aria-label": "search" }}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && prompt?.length > 0 && handleClick(prompt)}
				/>
			</Search>
			<Button
				variant="contained"
				onClick={() => {
					handleClick(prompt)
				}}
				disabled={loading || prompt === ""}
				sx={{
					width: "100px",
					mr: "20px",
					textTransform: "none",
					background: "#5f61c4",
					color: "white !important",
					fontWeight: "600",
					padding: "3px 10px",
					"&:hover": { background: "#424493" },
				}}
			>
				<SendIcon style={{ marginRight: 10, width: 20 }} /> {loading ? "Loading..." : "Send"}
			</Button>
		</Box>
	)
}

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	flexGrow: 1,
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: { xs: "10ch", sm: "35ch" },
		},
	},
}))

const GPTMessage = [
	{
		role: "system",
		content:
			"You are english language teacher, you lead conversation and explain things in simple language so everyone can learn. Answers should be precise and short up to 100 token. You are a teacher, so you should be patient and kind. ",
	},
	{
		role: "user",
		content: "Good morning, teacher! How are you today?",
	},
	{
		role: "assistant",
		content: "Good morning! I'm doing well, thank you. How about you? How was your evening?",
	},
	{
		role: "user",
		content: "I'm doing great, thank you for asking. My evening was good. I spent some time doing my homework.",
	},
	{
		role: "assistant",
		content: "That's good to hear! I hope you didn't find the homework too challenging.",
	},
	{
		role: "user",
		content: "No, it was manageable. If I had any questions, I would have asked you in class.",
	},
]
