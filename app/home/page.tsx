"use client"
import React from "react"
import { Box, Grid } from "@mui/material"
import ProtectedRoute from "../components/auth/ProtectedRoute"
import SidebarContainer from "../components/SidebarContainer"
import DashboardLessonTimetable from "../components/dashboard/DashboardLessonTimetable"
import DashboardLessonTimetableMobile from "../components/dashboard/DashboardLessonTimetableMobile"
import { useStoreUser } from "../components/zustand"
import ExploreTopics from "../components/dashboard/ExploreTopics"
import WordOfTheDay from "../components/dashboard/WordOfTheDay"
import MostRecentTestScore from "../components/dashboard/MostRecentTestScore"
import StudentRanking from "../components/dashboard/StudentRanking"
import DashboardTopics from "../components/dashboard/DashboardTopics"
import DashboardAvatar from "@/components/dashboard/DashboardAvatar"
import PricingModal from "@/components/pricing/PricingModal"
import Head from "next/head"
import Script from "next/dist/client/script"

function MyDashboard() {
	const { userInfo } = useStoreUser()

	return (
		<>
			<Head>
				<Script
					id="hotjar"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
            (function(c,s,q,u,a,r,e){
              c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
              c._hjSettings={hjid:5192862};
              r=s.getElementsByTagName('head')[0];
              e=s.createElement('script');e.async=1;
              e.src=q+c._hjSettings.hjid+u;r.appendChild(e);
            })(window,document,'https://static.hj.contentsquare.net/c/csq-','.js');
          `
					}}
				/>
			</Head>
			<ProtectedRoute permitArray={["admin", "student"]}>
				<SidebarContainer>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Box display={["flex", "none"]} alignItems="center" mb={2}>
								{((userInfo?.role === "student" && !userInfo?.paid) || userInfo?.role === "admin") && (
									<PricingModal buttonText="Upgrade to Pro" />
								)}
							</Box>
							<DashboardLessonTimetable />
							<DashboardLessonTimetableMobile />
						</Grid>
						<Grid item xs={12} md={6}>
							<DashboardAvatar />
						</Grid>
						<Grid item xs={12} sm={8}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<ExploreTopics />
								</Grid>
								<Grid item xs={12} sm={6}>
									<WordOfTheDay />
								</Grid>
								<Grid item xs={12} sm={6}>
									<MostRecentTestScore />
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={4}>
							<StudentRanking />
						</Grid>
						<Grid item xs={12}>
							<DashboardTopics />
						</Grid>
					</Grid>
				</SidebarContainer>
			</ProtectedRoute>
		</>
	)
}

export default MyDashboard
