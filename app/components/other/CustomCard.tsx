import React from "react"
import { Card, CardMedia, Typography, Box, capitalize } from "@mui/material"
import Link from "next/link"
import { useStoreUser } from "../zustand"
import { brandColors } from "../utils/brandColors"

const CustomCard = React.memo(
	({
		title,
		link,
		image,
		category,
		createdById,
		textStyle
	}: {
		title: string
		link: string
		image: string
		category: string
		createdById: string
		textStyle?: React.CSSProperties
	}) => {
		const { userInfo } = useStoreUser()

		return (
			<Link href={link}>
				<Card
					sx={{
						borderRadius: "10px",
						backgroundColor: "#ffffff",
						boxShadow: 3,
						p: 1,
						transition: "transform 0.3s ease-in-out",
						"&:hover": {
							cursor: "pointer",
							transform: "scale(1.01)",
						},
					}}
				>
					<Box
						//@ts-ignore
						sx={{ textAlign: "right", position: "relative" }}
					>
						{createdById === userInfo.uid && (
							<Typography
								sx={{
									background: brandColors.lightPurple,
									color: "#fff",
									display: "inline-block",
									padding: "4px 8px",
									borderRadius: "5px",
									fontSize: "10px",
									position: "absolute",
									left: "4px",
									top: "4px",
								}}
							>
								Created by you
							</Typography>
						)}
						<Box minHeight={140}>
							<CardMedia component="img" src={image || "/mobile-book.svg"} alt={title} sx={{ borderRadius: "10px" }} />
						</Box>
					</Box>

					<Box
						sx={{
							display: "flex",
							alignItems: "start",
							flexDirection: "column",
							borderRadius: "10px",
							margin: "10px 10px 4px",
							gap: "2px",
							width: "100%",
						}}
					>
						<Typography sx={{ height: 26, fontSize: "14px", fontWeight: "bold", maxWidth: "90%", ...textStyle }}>
							{capitalize(title || "").slice(0, 30) + (title?.length > 30 ? "..." : "")}
						</Typography>
						{category && <Typography noWrap sx={{ fontSize: "12px", fontWeight: "semibold", maxWidth: "90%", mt: 1 }}>
							#{category}
						</Typography>}
					</Box>
				</Card>
			</Link>
		)
	}
)

export default CustomCard
