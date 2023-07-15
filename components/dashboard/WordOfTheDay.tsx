import React from "react"
import { Box, Typography } from "@mui/material"
import Link from "next/link"
import Image from "next/image"

function WordOfTheDay() {
	return (
		<Box
			sx={{
				boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
				padding: "10px 20px",
				maxWidth: "400px",
				maxHeight: "250px",
				width: "100%",
				margin: "10px",
				borderRadius: "8px",
				background: "#1d243d",
				// "linear-gradient(270.54deg,rgba(6,189,196,.78) 33.14%,rgba(2,214,215,0) 57.93%),linear-gradient(104.19deg,rgba(37,1,83,0) 59.91%,#2f0388 77.15%),#454f9c",
			}}
		>
			<Typography sx={{ color: "white", mb: 2 }}>Word of the Day!</Typography>
			<Typography variant="h4" fontWeight="bolder" sx={{ color: "white", mb: 1 }}>
				🇬🇧 cherish
			</Typography>
			<Typography sx={{ color: "rgb(219 193 228)", mb: 2 }}>protect and care for (someone) lovingly.</Typography>
		</Box>
	)
}

export default WordOfTheDay
