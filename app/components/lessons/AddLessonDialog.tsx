import * as React from "react"
import {
	Alert,
	Button,
	TextField,
	Box,
	Dialog,
	DialogContent,
	DialogActions,
	IconButton,
	Grid,
	capitalize,
	Typography,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import { englishLevels } from "../utils/englishLevels"
import DatePickerX from "../elements/DatePickerX"
import { CreateLessonDialogProps, LessonTimetableType } from "@/types/types"

const AddLessonDialog = React.memo(
	({
		handleClose,
		open,
		buttonName,
		lessonInfo,
		setLessonInfo,
		message,
		_lesson,
		userInfo,
		deleteLesson,
		handleSave,
	}: CreateLessonDialogProps) => {
		return (
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
				fullWidth={true}
				maxWidth="lg"
			>
				<DialogContent dividers>
					<Box
						//@ts-ignore
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start",
							margin: "20px 40px",
						}}
					>
						<p
							style={{
								display: "flex",
								alignItems: "center",
								fontWeight: 600,
								fontSize: 22,
								margin: "10px 0px",
							}}
						>
							{buttonName ? buttonName : "Create lesson"}
						</p>

						<IconButton
							aria-label="close"
							onClick={handleClose}
							sx={{
								position: "absolute",
								right: 8,
								top: 8,
								color: (theme: any) => theme.palette.grey[500],
							}}
						>
							<CloseIcon />
						</IconButton>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
							}}
						>
							<Box
								component="form"
								noValidate
								// onSubmit={handleSubmit}
								sx={{ mt: 5, width: "100%" }}
							>
								<Grid container spacing={4}>
									<Grid item sm={6}>
										<TextField
											name="firstName"
											required
											fullWidth
											id="firstName"
											label="Topic"
											autoFocus
											value={lessonInfo.topic}
											onChange={(e) => setLessonInfo((prev) => ({ ...prev, topic: e.target.value }))}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											name="lesson_duration_minutes"
											type="number"
											required
											fullWidth
											id="lesson_duration_minutes"
											label="Lesson duration (minutes)"
											value={lessonInfo.lesson_duration_minutes}
											onChange={(e) =>
												setLessonInfo((prev) => ({ ...prev, lesson_duration_minutes: Number(e.target.value) }))
											}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											name="videoLink"
											fullWidth
											id="videoLink"
											label="Video call link"
											value={lessonInfo.video_call_link}
											onChange={(e) => setLessonInfo((prev) => ({ ...prev, video_call_link: e.target.value }))}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<DatePickerX calendarValue={lessonInfo.lesson_date} setCalendarValue={setLessonInfo} />
									</Grid>

									<Grid item xs={12}>
										<Typography sx={{ fontSize: 15, fontWeight: "bold" }}>Lesson level</Typography>
										<Box sx={{ display: "flex" }}>
											{["A0", "A1", "A2", "B1", "B2", "C1", "C2"].map((item, index) => (
												<Box
													key={index}
													onClick={() => setLessonInfo((prev) => ({ ...prev, level: item }))}
													sx={{
														flex: 1,
														textAlign: "center",
														color: "#373636",
														background: lessonInfo.level == item ? "#c1c1ff" : "white",
														border: `1px solid rgb(95 97 196)`,
														margin: "10px 5px 10px 0",
														borderRadius: "6px",
														fontSize: "14px",
														p: "5px 10px",
														cursor: "pointer",
													}}
												>
													{englishLevels[item]}
												</Box>
											))}
										</Box>
									</Grid>
									<Grid item xs={12}>
										<Typography sx={{ fontSize: 15, fontWeight: "bold" }}>Lesson type</Typography>
										<Box sx={{ display: "flex" }}>
											{["general_english", "speaking_club", "business_english", "ielts", "toefl"].map((item, index) => (
												<Box
													key={index}
													//@ts-ignore
													onClick={() => setLessonInfo((prev: LessonTimetableType) => ({ ...prev, lesson_type: item }))}
													sx={{
														flex: 1,
														textAlign: "center",
														color: "#373636",
														background: lessonInfo.lesson_type == item ? "#c1c1ff" : "white",
														border: `1px solid rgb(95 97 196)`,
														margin: "10px 5px 10px 0",
														borderRadius: "6px",
														fontSize: "14px",
														p: "5px 10px",
														cursor: "pointer",
													}}
												>
													{capitalize(item.split("_").join(" "))}
												</Box>
											))}
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Box
						sx={{
							display: "flex",
							justifyContent: "right",
							width: "100%",
						}}
					>
						<Box>
							{message && (
								<Box sx={{ m: "10px 30px" }}>
									<Alert severity="success">{message}</Alert>
								</Box>
							)}
						</Box>
						{(userInfo?.role == "admin" || userInfo?.role == "teacher") && (
							<Button
								variant="contained"
								color="error"
								onClick={(e: any) => deleteLesson(e)}
								sx={{
									m: "10px ",
									background: "rgb(255 92 92)",
								}}
							>
								Delete lesson
							</Button>
						)}
						<Button
							disabled={isButtonDisabled(lessonInfo)}
							variant="contained"
							onClick={handleSave}
							sx={{ m: "10px " }}
						>
							{_lesson ? "Update lesson" : "Create lesson"}
						</Button>
					</Box>
				</DialogActions>
			</BootstrapDialog>
		)
	}
)
const isButtonDisabled = (lessonInfo: LessonTimetableType) => {
	try {
		const { topic, level, lesson_type, lesson_date, video_call_link } = lessonInfo
		return !topic?.length || !level?.length || !lesson_type?.length || !lesson_date
	} catch (error) {
		return true
	}
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}))

export default AddLessonDialog
