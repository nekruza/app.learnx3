"use client"
import * as React from "react"
import { styled } from "@mui/material/styles"
import Badge from "@mui/material/Badge"
import Avatar from "@mui/material/Avatar"
import { usePathname } from "next/navigation"

const FinaAvatar = ({ handleFinaClick }: { handleFinaClick: () => void }) => {
	const pathname = usePathname()

	return (
		<>
			{!pathname.includes("avatar") && (
				<StyledBadge
					overlap="circular"
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					variant="dot"
					sx={{ bottom: ["80px", "20px", "20px"], zIndex: 998 }}
				>
					<Avatar
						sx={{ objectFit: "contain", width: "55px", height: "55px" }}
						alt="Fina"
						src="/teacher-johny.png"
						onClick={handleFinaClick}
					/>
				</StyledBadge>
			)}
		</>
	)
}

export default FinaAvatar

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"&:hover": {
		cursor: "pointer",
		opacity: 1,
	},
	background: "#ced7dc",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 10000,
	width: "60px",
	height: "60px",
	position: "absolute",
	right: "25px",
	border: "3px solid #5f61c4",
	borderRadius: "50%",
}))
