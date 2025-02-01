"use client"

import { createRef, useEffect, useState } from "react"
import { auth, generativeModel } from "@/components/firebaseX"
import { useTheme } from "@mui/material/styles"
import { Box, Grid, IconButton, Typography, useMediaQuery } from "@mui/material"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import dayjs from "dayjs"
import { useStoreUser } from "@/components/zustand"
import DeleteIcon from "@mui/icons-material/Delete"
import { brandColors } from "@/components/utils/brandColors"
import { FinaInput } from "./FinaInput"
import { InitialAIMessage } from "./InitialAIMessage"
import { AIMessage } from "./AIMessage"
import { MessageBubble } from "./MessageBubble"
import { UserMessage } from "./UserMessage"

interface Message {
	role: "model" | "user" | "system"
	parts: { text: string }[]
	order?: number
}

export default function Fina({ handleClose }: { handleClose: () => void }) {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const { userInfo } = useStoreUser()
	const [messages, setMessages] = useState<Message[]>([
		{
			role: "model",
			parts: [{ text: `Hi ${auth.currentUser?.displayName}! I am your AI tutor. How can I help you? 🙂` }],
			order: 1,
		},
	])

	// handle messages
	const handleMessage = (incomingMessage: Message) => {
		setMessages((prevMessages) => [
			...prevMessages,
			{
				role: incomingMessage.role,
				parts: incomingMessage.parts,
				order: prevMessages.length + 1,
			},
		])
	}

	// delete all messages
	const handleDelete = () => {
		setMessages([
			{
				role: "model",
				parts: [{ text: `Hi ${auth.currentUser?.displayName || ""}! I am your AI tutor. How can I help you? 🙂` }],
				order: 1,
			},
		])
	}

	const [loading, setLoading] = useState(false)
	const [chat, setChat] = useState<any>(null)

	useEffect(() => {
		// Initialize chat when component mounts
		const initChat = async () => {
			try {
				const chatInstance = await generativeModel.startChat({
					history: InitialAIMessage,
					generationConfig: {
						maxOutputTokens: 200,
					},
				})
				setChat(chatInstance)
			} catch (error) {
				console.error("Error initializing chat:", error)
			}
		}
		initChat()
	}, [])

	const handleClick = async (text: string) => {
		if (!chat) {
			// Add a user-friendly error message
			handleMessage({
				role: "model",
				parts: [{ text: "I'm still getting ready. Please try again in a moment." }],
			})
			return
		}

		// (Optional) Set up a flag to avoid state updates if the component unmounts.
		// You can replace this with useRef and cleanup in a useEffect.
		let isComponentMounted = true

		// Add user message
		handleMessage({ role: "user", parts: [{ text: text }] })
		setLoading(true)

		try {
			// Request response with streaming enabled
			const result = await chat.sendMessageStream(text)

			// If a native stream exists, process it with a for-await-of loop.
			handleMessage({ role: "model", parts: [{ text: "" }] })
			let streamingText = ""
			let lastUpdateTime = Date.now()
			for await (const chunk of result.stream) {
				// The chunk might be a string already or require extracting its text.
				const chunkText = typeof chunk === "string" ? chunk : await chunk.text()
				if (!chunkText) continue
				streamingText += chunkText

				const now = Date.now()
				if (now - lastUpdateTime > 100 && isComponentMounted) {
					setMessages((prevMessages) => {
						const newMessages = [...prevMessages]
						newMessages[newMessages.length - 1].parts[0].text = streamingText
						return newMessages
					})
					lastUpdateTime = now
				}
			}
			if (isComponentMounted) {
				// Final update once streaming is complete.
				setMessages((prevMessages) => {
					const newMessages = [...prevMessages]
					newMessages[newMessages.length - 1].parts[0].text = streamingText
					return newMessages
				})
				setLoading(false)
			}
		} catch (error) {
			console.error("Error while streaming:", error)
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
				width: isSmallScreen ? "100vw" : 450,
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
				<IconButton sx={{ color: brandColors.iconGrey }} onClick={handleClose}>
					<KeyboardDoubleArrowRightIcon />
				</IconButton>
				<Typography sx={{ width: "100%", textAlign: "center", color: brandColors.iconGrey }}>
					{dayjs().format("MMM D, YYYY")}
				</Typography>
				<IconButton sx={{ color: brandColors.iconGrey }} onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>
			</Box>
			<Box sx={{ width: "100%", overflow: "scroll", height: "100%", padding: "20px 10px" }} ref={chatsRef}>
				<Grid spacing={1} container>
					{messages?.map((item, index) => (
						<Grid item xs={12} key={index}>
							<Box
								sx={{
									display: "flex",
									width: "100%",
									color: "#323331",
									justifyContent: (item.order && (item.order % 2 ? "start" : "end")) || "start",
								}}
							>
								<MessageBubble>
									{item.order && item.order % 2 ? (
										<AIMessage text={item.parts[0].text} />
									) : (
										<UserMessage text={item.parts[0].text} userGender={userInfo?.gender} />
									)}
								</MessageBubble>
							</Box>
						</Grid>
					))}
				</Grid>{" "}
			</Box>

			<FinaInput loading={loading} handleClick={handleClick} />
		</Box>
	)
}
