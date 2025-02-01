import React from "react"
import ApiServices from "@/api/ApiServices"
import { Alert, Box, Grid, Skeleton } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ErrorPage from "@/errorpage"
import LessonTimetableCard from "../lessons/LessonTimetableCard"
import { LessonTimetableType } from "@/types/types"
import { useStoreUser } from "../zustand"
import { filterLessonsBySubscriptionType } from "../helpers/filterLessonsBySubscriptionType"
import LoadingPage from "../LoadingPage"

function DashboardLessonTimetable() {
	const { apiRequest } = ApiServices()
	const { userInfo } = useStoreUser()

	const {
		data: lessonTimetableData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["lessonTimetable"],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonTimetable" }),
		refetchOnWindowFocus: false,
	})

	const upcomingLessons = filterLessonsBySubscriptionType(lessonTimetableData?.data || [], userInfo)

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Box
			//@ts-ignore
			display={["none", "flex"]}
		>
			<Grid container spacing={2}>
				{isLoading ? (
					[1, 2, 3].map((skeletonKey) => (
						<Grid item xs={6} sm={4} key={skeletonKey}>
							<Skeleton variant="rounded" sx={{ height: "315px" }} />
						</Grid>
					))
				) : upcomingLessons?.length === 0 ? (
					<Alert
						severity="warning"
						sx={{
							p: 1,
							mt: 2,
							paddingY: "0px",
							fontSize: "15px",
							fontWeight: "500",
							width: "fit-content",
							display: { xs: "none", sm: "flex" },
						}}
					>
						No upcoming lessons
					</Alert>
				) : (
					upcomingLessons
						.sort((a: LessonTimetableType, b: LessonTimetableType) => (a.lesson_date! > b.lesson_date! ? 1 : -1))
						.slice(0, 3)
						.map((lesson: LessonTimetableType, index: number) => (
							<Grid key={index} item xs={12} sm={4} sx={{ display: { xs: "none", sm: "grid" } }}>
								<LessonTimetableCard lesson={lesson} />
							</Grid>
						))
				)}
			</Grid>
		</Box>
	)
}

export default DashboardLessonTimetable
