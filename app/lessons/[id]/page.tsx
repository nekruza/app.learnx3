"use client"
import { Box, Button, capitalize, Grid, Typography } from "@mui/material"
import ApiServices from "@/api/ApiServices"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ErrorPage from "@/errorpage"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import EventIcon from "@mui/icons-material/Event"
import AssessmentIcon from "@mui/icons-material/Assessment"
import VideocamIcon from "@mui/icons-material/Videocam"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { useStoreUser } from "@/components/zustand"
import ChipX from "@/components/elements/ChipX"
import { lessonTypeColors } from "@/components/utils/lessonTypeColors"
import { capitalizeFirstLetter } from "@/components/helpers/capitalizeFirstLetter"
import { englishLevels } from "@/components/utils/englishLevels"
import AddLesson from "@/components/lessons/AddLesson"
import { lessonDescription } from "@/components/data/LessonDescription"
import StudentCardMini from "@/components/student/StudentCardMini"
import AddIcon from "@mui/icons-material/Add"
import LogoutIcon from "@mui/icons-material/Logout"
import { UserType } from "@/types/types"
import { useMemo } from "react"
import CustomAvatar from "@/components/elements/CustomAvatar"
import { brandColors } from "@/components/utils/brandColors"
import { formatHourMinutes, formatMonthDay } from "@/components/helpers/localTime"
import { isAdminOrTeacher } from "@/components/hooks/userRoles"

function Lesson({ params }: { params: { id: string } }) {
	const queryClient = useQueryClient()
	const { apiRequest } = ApiServices()
	const { userInfo } = useStoreUser()
	const id = params.id

	// Fetch lessons
	const {
		data: lessonTimetableList,
		isLoading: cIsLoading,
		isError: cIsError,
	} = useQuery({
		queryKey: [`lessonTimetableOneLesson-${id}`],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonTimetable", uid: id as string }),
		refetchOnWindowFocus: false,
	})

	// fetch teacher data
	const {
		data: teacherData,
		isLoading: teacherIsLoading,
		isError: teacherIsError,
	} = useQuery({
		queryKey: [`teachers-${lessonTimetableList?.data?.teacher_id}`],
		queryFn: () => apiRequest("GET", null, { collectionName: "teachers", uid: lessonTimetableList?.data?.teacher_id }),
		refetchOnWindowFocus: false,
		enabled: !!lessonTimetableList?.data?.teacher_id,
	})

	// Join class
	const {
		mutate: joinClass,
		isLoading: isLoadingDelete,
		isError: isErrorDelete,
	} = useMutation(
		(students) => apiRequest("PATCH", students, { collectionName: "lessonTimetable", uid: id as string }),
		{
			onSuccess: () => queryClient.invalidateQueries([`lessonTimetableOneLesson-${id}`]),
		}
	)

	// fetch student data
	const { data, isLoading, isError } = useQuery({
		queryKey: ["students"],
		queryFn: () => apiRequest("GET", null, { collectionName: "students" }),
		refetchOnWindowFocus: false,
	})

	const handleJoinCLass = () => {
		if (userInfo.uid) {
			if (!lessonTimetableList?.data?.students?.includes(userInfo.uid)) {
				//@ts-ignore
				joinClass({ students: [...lessonTimetableList?.data?.students, userInfo.uid] })
			} else {
				const filteredStudents = lessonTimetableList?.data?.students?.filter((item: string) => item !== userInfo.uid)
				//@ts-ignore
				joinClass({ students: filteredStudents })
			}
		}
	}

	const studentJoined = useMemo(
		() => lessonTimetableList?.data?.students?.includes(userInfo?.uid) || false,
		[lessonTimetableList?.data?.students, userInfo?.uid]
	)

	if (cIsError || isError) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				{/* @ts-ignore */}
				<Box sx={BoxWrapperStyle}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									alignItems: "start",
									minHeight: "110px",
									height: "100%",
									minWidth: "290px",
								}}
							>
								<Box sx={{ display: { xs: "none", sm: "flex" } }}>
									<img
										style={{ position: "absolute", top: 30, right: 30, width: 330 }}
										src={
											lessonTimetableList?.data?.lesson_type === "speaking_club"
												? "/images/speaking-infographic.png"
												: "/images/teacher-image-infographic.png"
										}
										alt="teacher"
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										mb: 1,
										height: "100%",
									}}
								>
									<Typography
										sx={{
											fontWeight: 600,
											fontSize: 19,
											padding: 0,
											color: "black",
										}}
									>
										Topic: {capitalizeFirstLetter(lessonTimetableList?.data?.topic)}
									</Typography>
									<Box sx={{ display: "flex", ml: 2 }}>
										{lessonTimetableList?.data?.lesson_type && (
											<ChipX
												color={lessonTypeColors[lessonTimetableList?.data?.lesson_type]}
												text={capitalize(lessonTimetableList?.data?.lesson_type?.split("_")?.join(" "))}
												style={{
													background:
														lessonTimetableList?.data?.lesson_type === "speaking_club"
															? brandColors.lightPurple
															: "#0e9ade",
													fontWeight: 600,
													borderColor: "white",
													color: "white",
												}}
											/>
										)}
									</Box>
								</Box>

								<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
									<CustomAvatar
										image={teacherData?.data?.image}
										gender={userInfo?.gender}
										style={{
											width: "50px",
											height: "50px",
											margin: "10px 10px 10px 0px",
										}}
									/>
									<Box gap={"2px"}>
										<Typography
											sx={{
												fontSize: 10,
												padding: 0,
												color: "grey",
											}}
										>
											Teacher
										</Typography>
										<Typography noWrap sx={{ maxWidth: 140, color: "black", mr: 1, fontWeight: 600 }}>
											{capitalize(lessonTimetableList?.data?.teacher_name || "")}
										</Typography>
									</Box>
								</Box>

								<Box
									sx={{
										display: "flex",
										alignItems: "start",
										justifyContent: "space-between",
										flexDirection: "column",
										width: "100%",
										mt: 2,
									}}
								>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											alignItems: "start",
											mr: 3,
											mb: 2,
											color: "rgb(50, 50, 93)",
											fontSize: "13px",
											fontWeight: 500,
											width: "100%",

										}}
									>
										<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
											<EventIcon sx={{ mr: 1 }} />
											<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
												{formatMonthDay(lessonTimetableList?.data?.lesson_date)}
											</Typography>
										</Box>
										<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
											<AccessTimeIcon sx={{ mr: 1 }} />
											<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
												{formatHourMinutes(lessonTimetableList?.data?.lesson_date)}
											</Typography>
										</Box>
										<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
											<AssessmentIcon sx={{ mr: 1 }} />
											<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
												{englishLevels[lessonTimetableList?.data?.level]}
											</Typography>
										</Box>
									</Box>
									<Box sx={{ display: "flex", gap: "4px", width: "100%", justifyContent: "start" }}>
										<a
											target="_blank"
											rel="noreferrer"
											style={{ width: isAdminOrTeacher(userInfo) ? "max-content" : "100%" }}
											href={
												lessonTimetableList?.data?.lesson_type === "general_english"
													? lessonTimetableList?.data.video_call_link
													: "https://meet.google.com/fee-kuoc-brp?authuser=2"
											}
										>
											<Button
												sx={{
													marginRight: "5px",
													textTransform: "none",
													background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
													color: "white",
													fontWeight: "600",
													padding: "3px 10px",
													width: isAdminOrTeacher(userInfo) ? "max-content" : "100%",
													maxWidth: 400,
													"&:hover": { background: "#424493" },
												}}
											>
												<VideocamIcon
													sx={{
														color: "white",
														marginRight: "6px",
													}}
												/>
												<Typography sx={{ fontSize: 12, fontWeight: 600 }}>Video Call</Typography>
											</Button>
										</a>

										{isAdminOrTeacher(userInfo) && (
											<AddLesson _lesson={lessonTimetableList?.data} buttonName="Edit lesson" id={id} />
										)}
									</Box>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} sx={{ color: "rgb(50, 50, 93)", mt: 2 }}>
							<Typography fontSize="18px" fontWeight={500}>
								{" "}
								Lesson description
							</Typography>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									border: "1px solid rgb(50, 50, 93)",
									background: "white",
									mb: 1,
									p: "10px 20px",
									borderRadius: 2,
									color: "rgb(50, 50, 93)",
									mt: 1,
								}}
							>
								<Typography sx={{ fontSize: "15px", fontWeight: "inherit" }}>
									{lessonDescription[lessonTimetableList?.data?.lesson_type as keyof typeof lessonDescription]}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} sx={{ color: "rgb(50, 50, 93)", mt: 2 }}>
							<Box display={"flex"} gap={"10px"}>
								<Typography fontSize="18px" fontWeight={500}>
									{" "}
									Students joining the class
								</Typography>
								{userInfo?.role == "student" && (
									<>
										{lessonTimetableList?.data?.students?.length < 100 ? (
											<Button
												onClick={handleJoinCLass}
												sx={{
													marginRight: "5px",
													textTransform: "none",
													background: studentJoined ? "#ef476f" : "linear-gradient(45deg, #8b58fe, #5fdee7)",
													color: "white",
													fontWeight: "600",
													padding: "3px 10px",
													"&:hover": { background: "#424493" },
												}}
											>
												{!studentJoined ? (
													<>
														<AddIcon
															sx={{
																color: "white",
																marginRight: "6px",
															}}
														/>
														<Typography sx={{ fontSize: 12, fontWeight: 600 }}>Join</Typography>
													</>
												) : (
													<>
														<LogoutIcon
															sx={{
																color: "white",
																marginRight: "6px",
															}}
														/>
														<Typography sx={{ fontSize: 12, fontWeight: 600 }}>Leave</Typography>
													</>
												)}
											</Button>
										) : (
											<ChipX text="Class is full" color="#ef476f" />
										)}
									</>
								)}
							</Box>
							<Box
								sx={{
									display: "flex",
									flexWrap: "nowrap",
									overflowX: "scroll",
									marginBottom: "25px",
									mt: 2,
								}}
							>
								{data?.data
									?.filter((x: UserType) => lessonTimetableList?.data?.students?.includes(x.uid))
									.map((item: UserType, index: number) => (
										<Box key={index}>
											<StudentCardMini studentDetails={item} />
										</Box>
									))}
							</Box>
						</Grid>
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default Lesson

const BoxWrapperStyle = {
	padding: { xs: "20px", sm: "25px 40px" },
	borderRadius: "18px",
	color: "white",
	height: "100%",
	display: "flex",
	justifyContent: "start",
	alignItems: "center",
	flexDirection: "column",
	boxSizing: "border-box",
	width: "100%",
	overflow: "auto",
	position: "relative",
	border: "0.5px solid #ebfff6",
	background: brandColors.lighterGrey,
}
