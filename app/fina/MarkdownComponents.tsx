import { Box } from "@mui/material"

export const MarkdownComponents = {
	p: (props: any) => (
		<Box
			//@ts-ignore
			sx={{ m: "4px 0px", fontSize: 14 }}
			{...props}
		/>
	),
	ul: (props: any) => (
		<Box
			component="ul"
			sx={{
				m: 0,
				pl: 2.5,
				fontSize: 14,
			}}
			{...props}
		/>
	),
	code: (props: any) => (
		<Box
			component="code"
			sx={{
				display: "block",
				overflowX: "auto",
				padding: 1,
				backgroundColor: "#f5f5f5",
				borderRadius: 1,
				fontSize: 12,
				maxWidth: "100%",
			}}
			{...props}
		/>
	),
}
