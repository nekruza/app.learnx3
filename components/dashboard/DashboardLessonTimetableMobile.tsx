import React from "react"
import ApiServices from "@/pages/api/ApiServices"
import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ErrorPage from "../../pages/errorpage"
import isDateBeforeToday from "../helpers/isDateBeforeToday"
import LessonTimetableCard from "../lessons/LessonTimetableCard"
import LoadingPage from "../LoadingPage"
import { LessonTimetableType } from "@/types/types"

function DashboardLessonTimetableMobile() {
	const { apiRequest } = ApiServices()

	const {
		data: lessonTimetableList,
		isLoading: cIsLoading,
		isError: cIsError,
	} = useQuery({
		queryKey: ["lessonTimetable"],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonTimetable" }),
		refetchOnWindowFocus: false,
	})

	if (cIsError) return <ErrorPage />
	if (cIsLoading) return <LoadingPage />

	return (
		<Box sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column" }}>
			<Typography
				style={{
					margin: "0px 10px 10px 0px",
					fontWeight: 600,
					fontSize: 19,
					color: "#5f616a",
				}}
			>
				Upcoming lessons
			</Typography>
			<Box
				sx={{
					display: { xs: "flex", sm: "none" },
					overflowX: "scroll",
					overflowY: "hidden",
					boxSizing: "border-box",
					width: `calc(100vw-20px)`,
					marginTop: "20px",
				}}
			>
				{lessonTimetableList?.data
					?.filter(({ lesson_date }: { lesson_date: string }) => !isDateBeforeToday(lesson_date))
					?.sort((a: LessonTimetableType, b: LessonTimetableType) => (a.lesson_date > b.lesson_date ? 1 : -1))
					?.slice(0, 3)
					?.map((lesson: LessonTimetableType, index: number) => (
						<LessonTimetableCard key={index} lesson={lesson} />
					))}
			</Box>
		</Box>
	)
}

export default DashboardLessonTimetableMobile
