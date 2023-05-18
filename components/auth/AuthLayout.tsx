import { Box } from "@mui/system"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import WelcomeMessage from "../other/WelcomeMessage"

const theme = createTheme()

function AuthLayout({ children }: any) {
	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				background: "white",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ThemeProvider theme={theme}>
				<Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
					<WelcomeMessage />
					{children}
				</Box>
			</ThemeProvider>
		</Box>
	)
}

export default AuthLayout