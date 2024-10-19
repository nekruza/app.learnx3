"use client"
import React, { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { Box, Button, Grid, Typography } from "@mui/material"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import TableRowsIcon from "@mui/icons-material/TableRows"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import ApiServices from "@/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/errorpage"
import StudentCard from "@/components/student/StudentCard"
import StudentList from "@/components/student/StudentList"
import { UserType } from "@/types/types"
import { useStoreUser } from "../zustand"

function StudentCardList() {
	const { apiRequest } = ApiServices()
	const { userInfo } = useStoreUser()
	const pathname = usePathname()
	const [alignment, setAlignment] = React.useState("grid")

	// fetch student data
	const {
		data: students,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["students"],
		queryFn: () => apiRequest("GET", null, { collectionName: "students" }),
		refetchOnWindowFocus: false,
	})

	const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setAlignment(newAlignment)
	}

	useEffect(() => {
		pathname.includes("class-students") ? setAlignment("row") : setAlignment("grid")
	}, [])

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Box
			//@ts-ignore
			sx={{
				marginTop: "30px",
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography
					sx={{
						margin: "10px 10px 10px 0px",
						fontWeight: "600px",
						fontSize: "19px",
						color: "#5f616a",
					}}
				>
					All Students
					<Button
						sx={{
							background: "#5f6ac4",
							color: "white",
							boxShadow: "none",
							padding: "1px 10px 0px",
							marginLeft: "10px",
							fontWeight: "600px",
						}}
					>
						{students?.data?.length ?? 0} Students
					</Button>
				</Typography>
				<ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
					<ToggleButton value="row" sx={{ padding: "0px 5px", height: "35px" }}>
						<TableRowsIcon />
					</ToggleButton>
					<ToggleButton value="grid" sx={{ padding: "0px 5px", height: "35px" }}>
						<ViewModuleIcon />
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			{alignment == "grid" ? (
				<Box
					sx={{
						display: "flex",
						flexWrap: userInfo?.role === "student" ? "nowrap" : "nowrap",
						overflowX: "scroll",
						marginBottom: "45px",
						maxWidth: ["100%", "400px", "1000px", "1300px", "1400px"],
					}}
				>
					{students?.data?.map((item: UserType, index: number) => (
						<Box key={index}>
							<StudentCard studentDetails={item} />
						</Box>
					))}
				</Box>
			) : (
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<Grid container>
						<Grid item xs={12}>
							<StudentList data={students?.data} />
						</Grid>
					</Grid>
				</Box>
			)}
		</Box>
	)
}

export default StudentCardList
