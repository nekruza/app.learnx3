import { Box, Button, capitalize, Typography } from "@mui/material"
import dayjs from "dayjs"
import ChipX from "../elements/ChipX"
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter"
import localTime from "../helpers/localTime"
import { englishLevels } from "../utils/englishLevels"
import { lessonTypeColors } from "../utils/lessonTypeColors"
import AddLesson from "./AddLesson"
import EventIcon from "@mui/icons-material/Event"
import AssessmentIcon from "@mui/icons-material/Assessment"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useStoreUser } from "../zustand"
import Link from "next/link"
import { LessonTimetableType } from "@/types/types"
import { memo } from "react"
import CustomAvatar from "../elements/CustomAvatar"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "@/api/ApiServices"

const LessonTimetableCard = memo(({ lesson }: { lesson: LessonTimetableType }) => {
	const { userInfo } = useStoreUser()
	const { apiRequest } = ApiServices()

	// fetch teacher data
	const {
		data: teacherData,
		isLoading: teacherIsLoading,
		isError: teacherIsError,
	} = useQuery({
		queryKey: [`teachers-${lesson?.teacher_id}`],
		queryFn: () => apiRequest("GET", null, { collectionName: "teachers", uid: lesson?.teacher_id }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: !!lesson?.teacher_id,
	})
	return (
		<Box sx={BoxStyle}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					mb: 1,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
					<CustomAvatar image={teacherData?.data?.image} gender={userInfo?.gender} style={AvatarStyle} />
					<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
						<Typography noWrap sx={{ maxWidth: 140, fontSize: "8px", color: "grey", marginBottom: "-4px" }}>
							Teacher
						</Typography>
						<Typography noWrap sx={{ maxWidth: 140 }}>
							{lesson?.teacher_name}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex" }}>
					<ChipX
						color={lessonTypeColors[lesson?.lesson_type]}
						text={capitalize(lesson?.lesson_type.split("_").join(" "))}
					/>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "start",
					flexDirection: "column",
					mb: 1,
					height: "100%",
				}}
			>
				<Typography
					sx={{
						fontWeight: 600,
						fontSize: 15,
						padding: 0,
					}}
				>
					{capitalizeFirstLetter(lesson.topic)}
				</Typography>
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
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
						<EventIcon sx={{ mr: 1 }} />
						<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
							{dayjs(localTime(lesson.lesson_date)).format("dddd, MMM D")}
						</Typography>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
						<AccessTimeIcon sx={{ mr: 1 }} />
						<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
							{dayjs(localTime(lesson.lesson_date)).format(" HH:mm")} ({lesson.lesson_duration_minutes} min)
						</Typography>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
						<AssessmentIcon sx={{ mr: 1 }} />
						<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>{englishLevels[lesson.level]}</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Link href={`/lessons/${lesson.uid}`} style={{ textDecoration: "none" }}>
						<Button sx={ButtonStyle}>
							<VisibilityIcon
								sx={{
									color: "white",
									marginRight: "6px",
								}}
							/>
							<Typography sx={{ fontSize: 12, fontWeight: 600 }}>View</Typography>
						</Button>
					</Link>
					{userInfo.role == "admin" ||
						(userInfo.role == "teacher" && <AddLesson _lesson={lesson} buttonName="Edit lesson" />)}
				</Box>
			</Box>
		</Box>
	)
})
export default LessonTimetableCard

const BoxStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	alignItems: "start",
	minHeight: "110px",
	borderRadius: "10px",
	padding: "10px 20px 20px",
	position: "relative",
	height: "100%",
	overflow: "hidden",
	width: { xs: "300px", sm: "100%" },
	marginRight: { xs: "20px", sm: "0px" },
	minWidth: "290px",
	border: "0.5px solid #ebfff6",
	background: "linear-gradient(45deg, #D0DFFB, rgb(206 236 248 / 22%))",
	boxShadow: "0 2px 17px rgba(0,0,0,.08)",
}

const AvatarStyle = {
	width: "30px",
	height: "30px",
	m: "10px 10px 10px 0px",
}

const ButtonStyle = {
	marginRight: "5px",
	textTransform: "none",
	background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
	color: "white",
	fontWeight: "600",
	padding: "3px 10px",
	"&:hover": { background: "#424493" },
}