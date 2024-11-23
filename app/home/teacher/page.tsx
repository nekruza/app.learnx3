"use client"
import React from "react"
import { Grid } from "@mui/material"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import DashboardLessonTimetable from "@/components/dashboard/DashboardLessonTimetable"
import DashboardLessonTimetableMobile from "@/components/dashboard/DashboardLessonTimetableMobile"
import Statistics from "@/components/Statistics"
import StudentCardList from "@/components/student/StudentCardList"
import DashboardAvatar from "@/components/dashboard/DashboardAvatar"
import PresentationMainCard from "@/ai-presentations/components/PresentationMainCard"

function TeacherDashboard() {
	return (
		<ProtectedRoute permitArray={["admin", "teacher"]}>
			<SidebarContainer>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<DashboardLessonTimetable />
						<DashboardLessonTimetableMobile />
					</Grid>
					<Grid item xs={12} md={6}>
						<PresentationMainCard />
					</Grid>
					<Grid item xs={12}>
						<Statistics displayGraphs={false} />
					</Grid>
					<Grid item xs={12}>
						<StudentCardList />
					</Grid>
				</Grid>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default TeacherDashboard
