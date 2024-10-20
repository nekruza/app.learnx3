"use client"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "@/api/ApiServices"
import { Box, Button, Grid, Typography } from "@mui/material"
import ErrorPage from "@/errorpage"
import StudentList from "@/components/student/StudentList"
import LoadingPage from "@/components/LoadingPage"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import TeacherList from "@/components/teacher/TeacherList"
import { brandColors } from "@/components/utils/brandColors"

function AdminPage() {
	const { fetchAllStudents, fetchAllTeachers } = ApiServices()
	const [studentPage, setStudentPage] = React.useState(true)

	const {
		data: studentList,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["students"],
		queryFn: fetchAllStudents,
		refetchOnWindowFocus: false,
	})

	const {
		data: teacherList,
		isLoading: isLoadingTeacher,
		isError: isErrorTeacher,
	} = useQuery({ queryKey: ["teachers"], queryFn: fetchAllTeachers, refetchOnWindowFocus: false })

	if (isLoading || isLoadingTeacher)
		return (
			<Box
				//@ts-ignore
				sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<LoadingPage />
			</Box>
		)

	if (isError || isErrorTeacher) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin"]}>
			<SidebarContainer>
				<Box sx={{ display: "flex", flexDirection: "column", marginTop: "-10px" }}>
					<Box display={"flex"} gap={"1px"}>
						<Typography sx={{ fontSize: "20px", p: 1, fontWeight: "bolder", color: brandColors.darkerGrey }}>
							Manage Students and Teachers
						</Typography>
						<Box display={"flex"} alignItems={"center"} gap={"10px"}>
							<Button
								size="small"
								sx={{ height: "fit-content" }}
								variant={studentPage ? "contained" : "outlined"}
								onClick={() => setStudentPage(true)}
							>
								Students
							</Button>
							<Button
								size="small"
								sx={{ height: "fit-content" }}
								variant={!studentPage ? "contained" : "outlined"}
								onClick={() => setStudentPage(false)}
							>
								Teachers
							</Button>
						</Box>
					</Box>
					<Grid container spacing={4}>
						<Grid item xs={12} display={studentPage ? "flex" : "none"}>
							<StudentList data={studentList?.data} />
						</Grid>
						<Grid item xs={12} display={!studentPage ? "flex" : "none"}>
							<TeacherList data={teacherList?.data} />
						</Grid>
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}
export default AdminPage
