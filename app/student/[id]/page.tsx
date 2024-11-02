"use client"
import { Box, Grid, Typography } from "@mui/material"
import ApiServices from "@/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/errorpage"
import TestResult from "@/components/assessment/TestResult"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import CustomAvatar from "@/components/elements/CustomAvatar"

function StudentProfile({ params }: { params: { id: string } }) {
	const id = params.id
	const { fetchStudentData } = ApiServices()
	const { data, isLoading, isError } = useQuery({
		queryKey: [`student-${id}`, String(id)],
		queryFn: () => fetchStudentData(String(id)),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	if (isError) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				{isLoading ? (
					<Box
						//@ts-ignore
						sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
					>
						<LoadingPage />
					</Box>
				) : (
					<Box sx={BoxWrapperStyle}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Box
									sx={{
										display: "flex",
										alignItems: "left",
										justifyContent: "start",
										width: "100%",
										padding: "5px",
										marginBottom: 1,
									}}
								>
									<CustomAvatar
										gender={data?.data?.gender}
										image={data?.data?.image}
										style={{ width: 100, height: 100 }}
									/>
									<Box
										display="flex"
										alignItems="center"
										flexDirection="column"
										sx={{
											display: "flex",
											width: "100%",
											justifyContent: "center",
											alignItems: "flexStart",
											padding: "0px 30px",
										}}
									>
										<Typography
											sx={{
												color: "#323331",
												fontWeight: "600",
												fontSize: ["16px", "18px"],
												padding: 0,
												marginBottom: "15px",
											}}
										>
											{data?.data.name}
										</Typography>
										<Box
											sx={{
												display: "flex",
												justifyContent: "start",
												alignItems: "center",
												flexWrap: "wrap",
											}}
										>
											{[
												data?.data?.country || "country unknown",
												data?.data?.email || "email unknown",
												`${data?.data?.age || "NA"} years old`,
											].map((item, index) => (
												<Typography key={index} sx={TypographyStyle}>
													{item}
												</Typography>
											))}
											<Typography
												sx={{
													...TypographyStyle,
													color:
														data?.data.performance == "Struggling"
															? "rgb(226, 109, 128)"
															: data?.data.performance == "Doing Great"
																? "#5fc497"
																: "#41b6ff",
													border:
														data?.data.performance == "Struggling"
															? "1px solid rgb(226, 109, 128)"
															: data?.data.performance == "Doing Great"
																? "1px solid #5fc497"
																: "1px solid #41b6ff",
												}}
											>
												{data?.data.performance}
											</Typography>
										</Box>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<TestResult id={id as string} />
							</Grid>
						</Grid>
					</Box>
				)}
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default StudentProfile

const BoxWrapperStyle = {
	padding: "20px ",
	borderRadius: { xs: "12px", sm: "22px" },
	color: "white",
	height: "100%",
	display: "flex",
	justifyContent: "start",
	alignItems: "center",
	flexDirection: "column",
	background: "rgb(224, 225, 241)",
	boxSizing: "border-box",
	width: "100%",
	overflow: "auto",
	margin: "auto",
}

const TypographyStyle = {
	fontWeight: ["500", "600"],
	padding: ["0px 10px", "3px 10px"],
	background: "white",
	color: "rgb(50, 50, 93)",
	border: "1px solid rgb(50, 50, 93)",
	maxWidth: "191px",
	borderRadius: "12px",
	marginRight: "10px",
	fontSize: "12px",
	marginBottom: "10px",
}
