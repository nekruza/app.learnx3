import React from "react"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"

function ExploreTopics() {
	return (
		<Link href="/speak" style={{ width: "fit-content" }}>
			<Box
				sx={{
					boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
					maxWidth: "900px",
					maxHeight: "300px",
					width: "100%",
					margin: "0px 10px 10px 0px",
					borderRadius: "8px",
					cursor: "pointer",
					transition: "transform 0.3s ease-in-out",
					"&:hover": {
						cursor: "pointer",
						transform: "scale(1.02)",
					},
					overflow: "hidden",
					position: "relative",
					background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
				}}
			>
				<Typography
					variant="h3"
					fontWeight="bolder"
					sx={{ color: "#001663", mb: 1, position: "absolute", zIndex: 99, top: "40%", left: "5%" }}
				>
					Explore Topics
					<Typography>Generated by AI</Typography>
					<Button variant="outlined" sx={{ color: "white", border: "1px solid white" }}>
						View
					</Button>
				</Typography>
				<img src={"/explore-topics-1.png"} alt="book" style={{ width: "100%", aspectRatio: 3 / 1 }} />
			</Box>
		</Link>
	)
}

export default ExploreTopics
