"use client"
import React from "react"
import dayjs from "dayjs"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Alert, Box, Grid, Typography } from "@mui/material"
import AddLesson from "@/components/lessons/AddLesson"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "../api/ApiServices"
import ErrorPage from "../error"
import { useStoreUser } from "@/components/zustand"
import LessonTimetableCard from "@/components/lessons/LessonTimetableCard"
import isDateBeforeToday from "@/components/helpers/isDateBeforeToday"
import LoadingPage from "@/components/LoadingPage"
import { LessonTimetableType } from "@/types/types"
import groupLessonsByWeek from "@/components/helpers/getWeekRange"
import { filterLessonsBySubscriptionType } from "@/components/helpers/filterLessonsBySubscriptionType"
import { formatMonthDay } from "@/components/helpers/localTime"

function index() {
	const { apiRequest } = ApiServices()
	const { userInfo } = useStoreUser()
	const [myLessons, setMyLessons] = React.useState<"my" | "all">("all")

	const handleChange = (event: React.MouseEvent<HTMLElement>, filterLesson: "my" | "all") => setMyLessons(filterLesson)

	// Fetch lessons
	const {
		data: lessonTimetableList,
		isLoading: cIsLoading,
		isError: cIsError,
	} = useQuery({
		queryKey: ["lessonTimetable"],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonTimetable" }),
		refetchOnWindowFocus: false,
	})

	const lessonsList = groupLessonsByWeek(filterLessonsBySubscriptionType(lessonTimetableList?.data, userInfo))?.filter(
		(item) => !isDateBeforeToday(item?.date_to)
	)

	if (cIsError) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<Box
					//@ts-ignore
					sx={{ marginTop: "20px", width: "100%" }}
				>
					<Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "start",
								justifyContent: "space-between",
								flexDirection: "column",
								width: "100%",
							}}
						>
							<Typography
								sx={{
									margin: "0px 10px 10px 0px",
									fontWeight: "600",
									fontSize: "19px",
									color: "#5f616a",
								}}
							>
								Lessons
							</Typography>
							{(userInfo?.role === "admin" || userInfo?.role === "teacher") && (
								<Box display={["column", "column", "flex"]} alignItems="center" width={"100%"} gap={2}>
									<ToggleButtonGroup
										color="primary"
										value={myLessons}
										exclusive
										onChange={handleChange}
										aria-label="Platform"
										size="small"
										sx={{
											mb: [1, 1, 0],
										}}
									>
										<ToggleButton
											value="my"
											color="secondary"
											sx={{
												width: "max-content",
												textTransform: "none",
												padding: "3px 10px ",
											}}
										>
											My lessons
										</ToggleButton>
										<ToggleButton
											value="all"
											color="secondary"
											sx={{
												width: "max-content",
												textTransform: "none",
												padding: "3px 10px ",
											}}
										>
											All lessons
										</ToggleButton>
									</ToggleButtonGroup>
									<AddLesson />
								</Box>
							)}
						</Box>
					</Grid>
					<Grid container spacing={3}>
						{lessonsList?.length === 0 ? (
							<Alert
								severity="warning"
								sx={{ p: 1, mt: 4, ml: 3, paddingY: "0px", fontSize: "15px", fontWeight: "500", width: "fit-content" }}
							>
								No upcoming lessons
							</Alert>
						) : (
							lessonsList
								?.sort((a, b) => (a?.date_to > b?.date_to ? 1 : -1))
								?.map(
									(
										{
											date_from,
											date_to,
											lessons,
										}: {
											date_from: string
											date_to: string
											lessons: LessonTimetableType[]
										},
										index
									) => (
										<React.Fragment key={index}>
											<Grid item xs={12} key={index} sx={{ marginTop: "20px" }}>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														justifyContent: "space-between",
														width: "100%",
													}}
												>
													<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
														<Typography sx={{ fontSize: 16, fontWeight: 600 }}>
															{formatMonthDay(date_from)} - {formatMonthDay(date_to)}
														</Typography>
													</Box>
												</Box>
											</Grid>
											{lessons
												.sort((a: LessonTimetableType, b: LessonTimetableType) =>
													a.lesson_date! > b.lesson_date! ? 1 : -1
												)
												?.filter(({ teacher_id }) => (myLessons === "my" ? teacher_id === userInfo?.uid : true))
												.map((lesson: LessonTimetableType, index: number) => (
													<Grid key={index} item xs={12} sm={3} md={2}>
														{cIsLoading ? <LoadingPage /> : <LessonTimetableCard key={index} lesson={lesson} />}
													</Grid>
												))}
										</React.Fragment>
									)
								)
						)}
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default index
