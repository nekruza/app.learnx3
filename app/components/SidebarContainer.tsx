"use client"
import React from "react"
import { ThemeProvider, useTheme } from "@mui/material/styles"
import { Box } from "@mui/material"
import Sidebar from "./sidebar"
import Navbar from "./Navbar"
import MobileBottomBar from "./MobileBottomBar"
import DrawerComponent from "./ui/Drawer"

function SidebarContainer({ children }: { children: React.ReactNode }) {
	const theme = useTheme()

	return (
		<ThemeProvider theme={theme}>
			<Box
				//@ts-ignore
				sx={{ width: "100%", paddingBottom: { xs: "70px", sm: "10px" } }}
			>
				<DrawerComponent />

				<Box
					sx={{
						display: "flex",
						height: "100dvh",
						boxSizing: "border-box",
					}}
				>
					<Sidebar />
					<Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} width={"100%"}>
						<Box sx={BoxStyle}>
							<Navbar />
							{children}
						</Box>
						<MobileBottomBar />
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	)
}

export default SidebarContainer

const BoxStyle = {
	padding: { xs: "10px", sm: "10px 20px 10px 5px" },
	maxWidth: "1400px",
	height: "100vh",
	width: "100%",
	marginX: " auto",
	overflowY: "scroll",
}
