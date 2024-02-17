import React from "react"
import { Avatar, Box, Button, Typography } from "@mui/material"
import { useRouter } from "next/router"
import Link from "next/link"

function ErrorPage({ message = "" }) {
	const router = useRouter()
	return (
		<Box
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					maxWidth: "650px",
					background: "#5f6ac40f",
					borderRadius: "8px",
					padding: 5,
					paddingTop: "20px",
					margin: "10px",
					overflow: "hidden",
				}}
			>
				<Box sx={{ display: "flex" }}>
					<Avatar
						alt="Remy Sharp"
						src="/teacher-johny.png"
						sx={{
							cursor: "pointer",
							width: "120px",
							height: "120px",
							m: 1,
						}}
					/>
					<Typography sx={{ fontSize: 28, m: "auto", marginLeft: "10px" }}>
						{message.length > 0 ? message : "Sorry, something went wrong!"}
					</Typography>
				</Box>
				<Link href="/auth/login">
					<Button variant="contained">Login again</Button>
				</Link>
			</Box>
		</Box>
	)
}

export default ErrorPage
