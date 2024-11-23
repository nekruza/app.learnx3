"use client"
import React from "react"
import { Box } from "@mui/system"
import HomeIcon from "@mui/icons-material/Home"
import BarChartIcon from "@mui/icons-material/BarChart"
import { List } from "@mui/material"
import QuizIcon from "@mui/icons-material/Quiz"
import CastForEducationIcon from "@mui/icons-material/CastForEducation"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import PersonIcon from "@mui/icons-material/Person"
import { useStoreUser } from "./zustand"
import { usePathname, } from "next/navigation"
import Link from "next/link"
import VerifiedIcon from "@mui/icons-material/Verified"
import AppsIcon from "@mui/icons-material/Apps"
import SidebarItem from "./SidebarItem"
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural"
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

function sidebar() {
	const pathname = usePathname()
	const { userInfo } = useStoreUser()

	return (
		<Box
			//@ts-ignore
			sx={{
				background: "white",
				maxWidth: "none",
				width: "120px",
				transition: "width 0.3s ease-out",
				display: { xs: "none", sm: "flex" },
				flexDirection: "column",
				position: "relative",
				overflowX: "hidden",
			}}
		>
			<Link href={"/"} style={{ display: "flex", margin: "14px auto 10px", alignContent: "center" }}>
				<img src="/learnX3_logo.png" alt="mini logo" style={{ height: "44px", borderRadius: 4 }} />
			</Link>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
					borderRadius: 2,
					m: 1,
					p: "1px",
					marginTop: "40px",
				}}
			>
				<List>
					{userInfo?.role === "teacher" ? (
						dataTeacher()?.map((item, index) => <SidebarItem key={index} item={item} pathname={pathname} />)
					) : userInfo?.role === "student" ? (
						<>
							{dataStudent()?.map((item, index) => (
								<SidebarItem key={index} item={item} pathname={pathname} />
							))}
							<SidebarItem
								item={{
									name: "My Result",
									href: `/student/${userInfo?.uid}`,
									link: `/student/${userInfo?.uid}`,
									icon: <BarChartIcon sx={{ width: 30, height: 30 }} />,
								}}
								pathname={pathname}
							/>
						</>
					) : userInfo?.role === "admin" ? (
						dataAdmin().map((item, index) => <SidebarItem key={index} item={item} pathname={pathname} />)
					) : (
						""
					)}
				</List>
			</Box>
		</Box>
	)
}

export default sidebar

const dataTeacher = () => {
	return [
		{
			name: "Dashboard",
			href: "/",
			link: `/`,
			icon: <HomeIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Lessons",
			href: "/lessons",
			link: "/lessons",
			icon: <AppsIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Presentations",
			href: "/ai-presentations",
			link: "/ai-presentations",
			icon: <AutoAwesomeMosaicIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Topics",
			href: "/speak",
			link: "/speak",
			icon: <LightbulbIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "All Students",
			href: `/home/class-students`,
			link: `/home/class-students`,
			icon: <PersonIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Student Results",
			href: `/student/results`,
			link: `/student/results`,
			icon: <VerifiedIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Fina AI",
			href: "/avatar",
			link: "/avatar",
			icon: <FaceRetouchingNaturalIcon sx={{ width: 30, height: 30 }} />,
		},
		// {
		// 	name: "Class Statistics",
		// 	href: "/class-statistics",
		// 	link: "/class-statistics",
		// 	icon: <QueryStatsIcon sx={{ width: 30, height: 30 }} />,
		// },
	]
}

const dataStudent = () => {
	return [
		{
			name: "Dashboard",
			href: "/",
			link: `/`,
			icon: <HomeIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Topics",
			href: "/speak",
			link: "/speak",
			icon: <LightbulbIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Lessons",
			href: "/lessons",
			link: "/lessons",
			icon: <AppsIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Fina AI",
			href: "/avatar",
			link: "/avatar",
			icon: <FaceRetouchingNaturalIcon sx={{ width: 30, height: 30 }} />,
		},
	]
}

const dataAdmin = () => {
	return [
		{
			name: "Dashboard",
			href: "/",
			link: "/",
			icon: <CastForEducationIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Lessons",
			href: "/lessons",
			link: "/lessons",
			icon: <AppsIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Presentations",
			href: "/ai-presentations",
			link: "/ai-presentations",
			icon: <AutoAwesomeMosaicIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "All Students",
			href: `/home/class-students`,
			link: `/home/class-students`,
			icon: <PersonIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Topics",
			href: "/speak",
			link: "/speak",
			icon: <LightbulbIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Student Results",
			href: `/student/results`,
			link: `/student/results`,
			icon: <VerifiedIcon sx={{ width: 30, height: 30 }} />,
		},

		{
			name: "Tests",
			href: "/test",
			link: "/test",
			icon: <QuizIcon sx={{ width: 30, height: 30 }} />,
		},
	]
}
