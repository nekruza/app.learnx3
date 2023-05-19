import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { Alert, Typography } from "@mui/material"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import AuthLayout from "@/components/auth/AuthLayout"
import Link from "next/link"
import { auth } from "@/components/FirebaseX"

function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<a color="inherit" href="#">
				LearnX3
			</a>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

export default function Register() {
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [confirmPassword, setConfirmPassword] = React.useState("")
	const [message, setMessage] = React.useState("")

	// Handle register
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				sendEmailVerification(user).then(() => {
					// Email verification sent!
					setMessage("Email verification sent! Please check your email. After verified your account, you can log in.")
					// navigate("/auth/login");
				})
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				if (errorMessage.includes("email-already-in-use")) {
					setMessage("Email address already exists")
				} else {
					setMessage(errorMessage)
				}
			})
	}

	return (
		<AuthLayout>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					maxWidth: "450px",
					background: "#5f6ac40f",
					borderRadius: "8px",
					padding: 5,
					paddingTop: "30px",
					margin: "10px",
				}}
			>
				<CssBaseline />
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOpenIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								value={email}
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								value={password}
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								value={confirmPassword}
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="password"
								autoComplete="new-password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							{confirmPassword !== password && <Alert severity="error">Passwords do not match!</Alert>}
							{message && <Alert severity="success">{message}</Alert>}
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Link href="/auth/login">
								Already have an account? <span style={{ textDecoration: "underline", color: "#1976d2" }}>Sign in</span>
							</Link>
						</Grid>
					</Grid>
				</Box>
				<Copyright sx={{ mt: 2 }} />
			</Box>
		</AuthLayout>
	)
}
