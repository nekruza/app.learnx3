import { alpha, styled } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import { useState } from "react"

export const FinaInput = ({ loading, handleClick }: { loading: boolean; handleClick: (text: string) => void }) => {
	const [prompt, setPrompt] = useState("")

	const onSubmit = () => {
		if (prompt.length > 0) {
			handleClick(prompt)
			setPrompt("")
		}
	}

	return (
		<Box
			//@ts-ignore
			sx={{
				display: "flex",
				flexDirection: "row",
				paddingTop: "12px",
				marginTop: 1,
				marginBottom: { xs: "130px", sm: "10px" },
				paddingLeft: { xs: "15px", sm: 0 },
				width: "100%",
			}}
		>
			<Search>
				<SearchIconWrapper>🤖</SearchIconWrapper>
				<StyledInputBase
					autoFocus
					placeholder="Ask your question here..."
					inputProps={{ "aria-label": "search" }}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && onSubmit()}
				/>
			</Search>
			<Button
				variant="contained"
				onClick={onSubmit}
				disabled={loading || prompt === ""}
				sx={{
					width: "100px",
					mr: "20px",
					textTransform: "none",
					background: "#5f61c4",
					color: "white !important",
					fontWeight: "600",
					padding: "3px 10px",
					"&:hover": { background: "#424493" },
				}}
			>
				<SendIcon style={{ marginRight: 10, width: 20 }} /> {loading ? "Loading..." : "Send"}
			</Button>
		</Box>
	)
}

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	flexGrow: 1,
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: { xs: "10ch", sm: "35ch" },
		},
	},
}))
