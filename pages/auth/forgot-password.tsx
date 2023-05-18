import { Alert, Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { sendPasswordResetEmail } from "firebase/auth"
import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { auth } from "@/pages/firebaseX"
import AuthLayout from "@/components/auth/AuthLayout"
import Link from "next/link"

function ForgotPassword(props) {
	const [email, setEmail] = React.useState("")
	const [message, setMessage] = React.useState("")

	const handleSubmit = (e) => {
		e.preventDefault()

		sendPasswordResetEmail(auth, email)
			.then(() => {
				setMessage("Please check your email")
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log("errorMessage", errorMessage)
				// ..
			})
	}
	return (
		<AuthLayout>
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					maxWidth: "100%",
					minWidth: "400px",
					background: "#5f6ac40f",
					borderRadius: "8px",
					padding: 5,
					paddingTop: "30px",
					margin: "10px",
				}}
			>
				<CssBaseline />
				<Typography component="h1" variant="h5" mb="10px">
					Reset Password
				</Typography>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{message && <Alert severity="success">{message}</Alert>}
				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
					Reset password
				</Button>
				<Link href="/auth/login">
					<Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
						Go to Loginss
					</Button>
				</Link>
			</Box>
		</AuthLayout>
	)
}

export default ForgotPassword
