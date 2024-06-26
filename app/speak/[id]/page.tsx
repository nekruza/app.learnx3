"use client"
import { useQuery } from "@tanstack/react-query"
import { Box, Grid } from "@mui/material"
import ApiServices from "@/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import SidebarContainer from "@/components/SidebarContainer"
import ErrorPage from "../../error"
import SpeakingInfo from "../SpeakingInfo"
import FlashCards from "@/components/speakpage/FlashCards"
import Phrases from "@/components/speakpage/Phrases"
import AskQuestions from "@/components/speakpage/AskQuestions"
import Conversation from "@/components/speakpage/Conversation"
import SpeakAssessment from "@/components/speakpage/SpeakAssessment"

export default function SpeakingLessonAi({ params }: { params: { id: string } }) {
	const { fetchOneLessonByAi } = ApiServices()
	const id = params.id
	// Fetch curriculum
	const {
		data: lessonByAi,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [`lessonByAi-${id}`],
		queryFn: () => fetchOneLessonByAi(id as string),
		refetchOnWindowFocus: false,
	})

	if (isError) return <ErrorPage />

	return (
		<SidebarContainer>
			{isLoading ? (
				<Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<LoadingPage />
				</Box>
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<SpeakingInfo topic={lessonByAi?.data?.topic} imagePath={lessonByAi?.data?.imagePath} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<FlashCards lesson={lessonByAi?.data} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Phrases lesson={lessonByAi?.data} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Conversation lesson={lessonByAi?.data} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<AskQuestions lesson={lessonByAi?.data} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<SpeakAssessment lesson={lessonByAi?.data} />
					</Grid>
				</Grid>
			)}
		</SidebarContainer>
	)
}
