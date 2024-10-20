"use client"
import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material"
import { useState } from "react"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
import { useStoreUser, useStoreTemporary } from "../zustand"
import { useQueryClient } from "@tanstack/react-query"
import InputBase from "@mui/material/InputBase"
import { styled, alpha } from "@mui/material/styles"
import { collection, addDoc } from "firebase/firestore"
import { db, storage } from "../firebaseX"
import { useRouter } from "next/navigation"
import { AiLessonStructure } from "../data/AiLessonStructure"
import OpenAiFina from "../utils/OpenAiFina"
import { TopicType } from "@/types/types"
import OpenAI from "openai"
import { ref, uploadBytesResumable } from "firebase/storage"
import { constants } from "../constants/constants"
import { base64ToBlob } from "../helpers/base64ToBlob"
import { v4 as uuidv4 } from "uuid"
import { getObject } from "../helpers/getObject"

const CreateAiLesson = ({ topics }: { topics: TopicType[] }) => {
	const { push: navigate } = useRouter()
	const queryClient = useQueryClient()
	const { userInfo } = useStoreUser()
	const { loadingGenContentAI, setLoadingGenContentAI } = useStoreTemporary()
	const [topic, setTopic] = useState("")
	const [error, setError] = useState("")
	const openai = new OpenAI({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
		dangerouslyAllowBrowser: true,
	})

	async function CreateAiLessonFunc() {
		setLoadingGenContentAI(true)
		try {
			const topicExists = topics.find((item) => item.topic.toLowerCase().trim() === topic.toLowerCase().trim())
			if (topicExists) {
				setError("Topic already exists! Check the list of topics.")
				setLoadingGenContentAI(false)
				return
			}

			const response = await OpenAiFina({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "system",
						content: "You are a very smart assistant which produces result only in JSON format",
					},
					{
						role: "user",
						content: `Create english language curriculum topic Family. Return it in JSON format. I will use the document on my website to create content for english language platform so children could learn speaking english. Choose one of the following for category Learning, Movies, News, Sport, Travel, Gaming, Lifestyle, Entertainment, Fashion, Technology, Entrepreneurship, History, Geography, Family, other. Exercise should be multiple choice questions.`,
					},
					{
						role: "assistant",
						content: `${JSON.stringify(AiLessonStructure)}`,
					},
					{
						role: "user",
						content: `Create english language curriculum in topic ${topic}. Return it in JSON format. I will use the document on my website to create content for english language platform so children could learn speaking english. Exercise should be multiple choice questions.`,
					},
				],
				temperature: 0.7,
				max_tokens: 10000,
				presence_penalty: 0,
			})
			const createdLesson = response.choices[0].message.content && getObject(response.choices[0].message.content)

			const uniqueId = uuidv4()
			let imagePath
			try {
				//DALL-E image generation
				const image = await openai.images.generate({
					model: "dall-e-3",
					// model: userInfo.role === "student" ? "dall-e-2" : "dall-e-3",
					prompt: `Create an animated image of ${topic}.`,
					response_format: "b64_json",
					// size: userInfo.role === "student" ? "512x512" : "1024x1024",
				})
				// Convert image from b64_json to JPEG
				const decodedImage = base64ToBlob(image.data[0].b64_json)
				// generate unique ID

				// Save image in firebase storage
				const storageRef = ref(
					storage,
					`${constants.FIREBASE_STORAGE_TOPIC_IMAGE_PATH}/${userInfo.uid + "-" + uniqueId}`
				)
				if (decodedImage) uploadBytesResumable(storageRef, decodedImage)

				imagePath = `${userInfo.uid + "-" + uniqueId}`
			} catch (error) {
				imagePath = null
			}

			// Save lesson info in Firestore
			const lessonDoc = await addDoc(collection(db, "lessonByAi"), {
				...createdLesson,
				imagePath,
				createdAt: `${new Date().toISOString()}`,
				createdById: `${userInfo.uid}`,
				createdByName: `${userInfo.name}`,
			})
			await addDoc(collection(db, "lessonByAiTopics"), {
				topic: createdLesson.topic,
				imagePath,
				lessonId: lessonDoc.id,
				createdAt: `${new Date().toISOString()}`,
				createdById: `${userInfo.uid}`,
				createdByName: `${userInfo.name}`,
				category: createdLesson.category?.toLowerCase() || "other",
			})

			queryClient.invalidateQueries(["lessonByAiTopics", "topicImages"])
			setLoadingGenContentAI(false)
			setError("no-error")
			setTopic("")
			navigate(`/speak/${lessonDoc.id}`)
		} catch (error) {
			console.log("error", error)
			setLoadingGenContentAI(false)
			setError("An error occurred while creating your curriculum. Please try again.")
		}
	}

	return (
		<Box
			//@ts-ignore
			sx={ComponentWrapperStyle}
		>
			<Box p={"10px"} width={"100%"}>
				<Typography
					fontWeight="bolder"
					sx={{ color: "#001663", m: 3, textAlign: "center", fontSize: { xs: 20, sm: 24 } }}
				>
					✨ Unleash the Power of AI! Generate Curriculum with a Click!
				</Typography>
				<Box sx={BoxStyleWrapper}>
					<Search>
						<SearchIconWrapper>🤖</SearchIconWrapper>
						<StyledInputBase
							sx={{ width: "-webkit-fill-available" }}
							placeholder="Write your topic…"
							inputProps={{ "aria-label": "search" }}
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && CreateAiLessonFunc()}
						/>
					</Search>
					<Button
						variant="contained"
						onClick={CreateAiLessonFunc}
						disabled={loadingGenContentAI || topic === ""}
						sx={ButtonStyle}
					>
						<AutoFixHighIcon sx={{ marginRight: "10px" }} /> {loadingGenContentAI ? "Loading..." : "Generate"}
					</Button>
				</Box>
				<Box
					sx={{
						display: "flex",
						margin: "10px",
						p: 1,
					}}
				>
					{loadingGenContentAI ? (
						<Box sx={{ width: "100%" }}>
							<LinearProgress />
							<Typography sx={{ m: 1, textAlign: "center" }}>
								Your Custom Curriculum is Underway! It takes around <b>1 minute</b> to create your curriculum.
							</Typography>
						</Box>
					) : error === "no-error" ? (
						<Alert severity="success" sx={{ p: 1, m: "8px auto", paddingY: "0px", width: "fit-content" }}>
							Your curriculum has been successfully created!
						</Alert>
					) : error ? (
						<Alert severity="error" sx={{ p: 1, m: "8px auto", paddingY: "0px", width: "fit-content" }}>
							{error}
						</Alert>
					) : (
						<Typography
							sx={{
								p: 1,
								m: 1,
								color: "#001663",
								paddingY: "0px",
								width: "100%",
								fontWeight: "semibold",
								textAlign: "center",
							}}
						>
							Enter your topic and click on Generate to create your curriculum.
						</Typography>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default CreateAiLesson

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: "0px !important",
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
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "-webkit-fill-available",
		},
	},
}))

const ComponentWrapperStyle = {
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	alignItems: "center",
	boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
	width: "100%",
	minHeight: "250px",
	margin: "10px auto 20px",
	borderRadius: "8px",
	overflow: "hidden",
	position: "relative",
	background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
	borderBox: "box-sizing",
}

const BoxStyleWrapper = {
	display: "flex",
	flexDirection: { xs: "column", sm: "row" },
	width: "100%",
	p: 1,
	justifyContent: "center",
	alignItems: "center",
}

const ButtonStyle = {
	background: "rgb(50, 51, 49)",
	color: "white",
	fontWeight: "bold",
	fontSize: "12px",
	margin: "auto",
	mt: { xs: 2, sm: "2px" },
	ml: { xs: "auto", sm: "16px" },
}
