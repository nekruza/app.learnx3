"use client"
import * as React from "react"
import { useUser } from "@clerk/clerk-react"
import { updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useRouter } from "next/navigation"
import { useStoreUser } from "@/components/zustand"
import { auth, db, storage } from "@/components/firebaseX"
import { Alert, Divider, Input, Typography } from "@mui/material"
import Link from "next/link"
import { UserType } from "@/types/types"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { constants } from "@/components/constants/constants"

type TeacherForm = Pick<UserType, "name" | "age" | "phone" | "country" | "qualification" | "gender" | "image">

export default function UserForm() {
	const { push: navigate } = useRouter()
	const { user } = useUser()
	const { setUserInfo } = useStoreUser()
	const [error, setError] = React.useState("")
	const [status, setStatus] = React.useState<{
		loading: boolean
		error: boolean
	}>({
		loading: false,
		error: false,
	})

	const [{ name, age, gender, phone, qualification, image }, setUserInformation] = React.useState<TeacherForm>({
		name: "",
		age: null,
		phone: null,
		country: "",
		qualification: "",
		gender: "",
		image: null,
	})

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>, option?: "male" | "female") => {
		const { name, value, type, files } = event.target
		if (type === "file" && files) {
			setUserInformation((prev) => ({
				...prev,
				[name]: files[0],
			}))
		} else {
			setUserInformation((prev) => ({
				...prev,
				[name]: value,
				...(option && { gender: option }),
			}))
		}
	}

	// Add user data with specified ID, if you want with auto generated ID -> use addDoc()
	async function addUser(id: string, name: string) {
		const currentUserInfo = {
			uid: id,
			name: name,
			email: user?.primaryEmailAddress?.emailAddress || "",
			age: age,
			gender: gender,
			phone: phone,
			country: "UK",
			role: "teacher",
			permit: false,
			bio: "Experienced English teacher with a passion for helping students improve their language skills.",
			qualification: ["Teaching English as a Foreign Language (TEFL)"],
			specializations: ["Speaking", "Pronunciation"],
			reviews: [],
			image,
			createdAt: new Date().toISOString(),
		}

		setStatus({ loading: true, error: false })

		try {
			if (image) {
				const imageRef = ref(storage, `${constants.FIREBASE_STORAGE_TEACHER_IMAGE_PATH}/${`image-${id}`}`)
				await uploadBytes(imageRef, image as any)
				const imageX = await getDownloadURL(imageRef)
				await setDoc(doc(db, "teachers", id), { ...currentUserInfo, image: imageX, imageRef: imageRef.fullPath })
				setUserInfo({ ...currentUserInfo, image: imageX, imageRef: imageRef.fullPath })
				setStatus({ loading: false, error: false })
			} else {
				await setDoc(doc(db, "teachers", id), {
					...currentUserInfo,
				})
				setUserInfo({ ...currentUserInfo })
				setStatus({ loading: false, error: false })
			}
		} catch (e) {
			console.error("Error adding document: ", e)
			setStatus({ loading: false, error: true })
		}
	}

	// Handle register
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		updateProfile(auth.currentUser as any, {
			displayName: name,
		})
			.then(async () => {
				if (auth.currentUser) {
					await addUser(auth.currentUser.uid, auth.currentUser.displayName || "")
					navigate("/")
				}
			})
			.catch((error) => {
				setError("Something went wrong, please try again later")
				console.log("user-type errorMessage", error.message)
			})
	}

	return (
		<Box
			//@ts-ignore
			sx={BoxWrapperStyle}
		>
			<CssBaseline />
			<Box sx={BoxStyle}>
				<Typography
					sx={{
						display: "flex",
						alignItems: "Start",
						fontWeight: "600",
						fontSize: "22px",
						margin: "5px 0px",
					}}
				>
					Teacher Profile Details 👨‍🏫
				</Typography>
				<Typography>Enter details to set up your account </Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 500 }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								size="small"
								name="name"
								required
								fullWidth
								id="firstName"
								label="Full Name"
								autoFocus
								value={name}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								size="small"
								type="number"
								fullWidth
								label="Age"
								name="age"
								value={age}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								size="small"
								type="number"
								fullWidth
								label="Phone Number"
								name="phone"
								value={phone}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								size="small"
								name="qualification"
								required
								fullWidth
								id="qualification"
								label="Qualification / Certifications"
								value={qualification}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Input
								name="image"
								type="file"
								placeholder="Upload Image"
								onChange={handleChange}
								style={{
									borderBottom: "0px ",
									background: "#f5f5f5",
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<ToggleButtonGroup
								size="small"
								color="primary"
								value={gender}
								exclusive
								// @ts-ignore
								onChange={handleChange}
								aria-label="Platform"
								sx={{ borderColor: "#e5e7eb", height: 56, width: "100%" }}
							>
								<ToggleButton
									value="male"
									sx={{
										display: "flex",
										flex: 1,
										borderColor: "#e5e7eb",
									}}
								>
									👨‍💻 Male
								</ToggleButton>
								<ToggleButton
									value="female"
									sx={{
										display: "flex",
										flex: 1,
										borderColor: "#e5e7eb",
									}}
								>
									👩‍💻 Female
								</ToggleButton>
							</ToggleButtonGroup>
						</Grid>
						{error && <Alert severity="error">{error} </Alert>}
					</Grid>
					<Box sx={{ display: "flex" }}>
						<Button
							disabled={!name || !age || !qualification}
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 4, mb: 2, background: "linear-gradient(45deg, rgb(139, 88, 254), rgb(95, 222, 231))" }}
						>
							{status.loading ? "Loading..." : "Save"}
						</Button>
					</Box>
				</Box>
				<Divider sx={{ marginY: "15px", color: "black" }} />
				<Grid item xs={12} sx={{ width: "100%" }}>
					<Link href={"/auth/student-form"} style={{ width: "100%" }}>
						<Button
							fullWidth
							variant="contained"
							sx={{
								width: "100%",
								mt: 1,
								mb: 1,
								background: "white",
								marginRight: "10px",
								boxShadow: "none",
								border: "0.5px solid grey",
								color: "grey",
								"&:hover": { background: "#8080802b", boxShadow: "none" },
							}}
						>
							I am a student 👩‍🎓
						</Button>
					</Link>
				</Grid>
			</Box>
		</Box>
	)
}

const BoxWrapperStyle = {
	display: "flex",
	flexDirection: { xs: "column", sm: "row" },
	alignItems: "center",
	justifyContent: "center",
	background: "#5f6ac40f",
	height: "100vh",
	overflow: "hidden",
	gap: "20px",
	padding: "20px",
}

const BoxStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "start",
	maxWidth: "600px",
	borderRadius: "8px",
	width: "100%",
	padding: { xs: 3, sm: 5 },
	paddingTop: "20px",
	margin: "10px",
	overflow: "hidden",
	boxShadow: "0 2px 17px rgba(0,0,0,.08)",
	border: ".4px solid #ebeeff",
	background: "white",
}
