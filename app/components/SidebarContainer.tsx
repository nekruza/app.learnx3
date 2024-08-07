"use client"
import React from "react"
import { ThemeProvider, useTheme } from "@mui/material/styles"
import { Box, useMediaQuery } from "@mui/material"
import Sidebar from "./sidebar"
import Navbar from "./Navbar"
import FinaAvatar from "./fina/FinaAvatar"
import MobileBottomBar from "./MobileBottomBar"
import { FinaAvatarMobilePopup } from "./fina/FinaAvatarMobilePopup"
import { useStoreTemporary } from "./zustand"
import Fina from "@/fina/page"

function SidebarContainer({ children }: { children: React.ReactNode }) {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const { setBotComponentWidth } = useStoreTemporary()
	const [finaPopupOpen, setFinaPopupOpen] = React.useState<boolean>(false)

	const handleFinaPopup = () => {
		isSmallScreen ? setFinaPopupOpen(true) : setBotComponentWidth(900)
	}

	return (
		<ThemeProvider theme={theme}>
			<Box
				//@ts-ignore
				sx={{ width: "100%", paddingBottom: { xs: "70px", sm: "10px" } }}
			>
				<FinaAvatar handleFinaClick={handleFinaPopup} />
				<FinaAvatarMobilePopup open={finaPopupOpen} setOpen={setFinaPopupOpen} />

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
					{!isSmallScreen && <Fina setOpen={setFinaPopupOpen} />}
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
