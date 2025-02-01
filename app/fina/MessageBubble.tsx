"use client"

import { Box } from "@mui/material"

export const MessageBubble = ({ children, sx = {} }: { children: React.ReactNode; sx?: React.CSSProperties }) => (
	<Box
		//@ts-ignore
		sx={{
			display: "flex",
			width: "fit-content",
			m: "5px 10px",
			padding: "5px 10px",
			height: "fit-content",
			alignItems: "center",
			borderRadius: 2,
			maxWidth: "80%",
			background: "white",
			wordBreak: "break-word",
			overflow: "auto",
			boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
			...sx,
		}}
	>
		{children}
	</Box>
)
