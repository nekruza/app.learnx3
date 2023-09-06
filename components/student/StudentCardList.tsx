import React, { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { Box, Button, Grid, Typography } from "@mui/material"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import TableRowsIcon from "@mui/icons-material/TableRows"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/pages/errorpage"
import StudentCard from "@/components/student/StudentCard"
import StudentList from "@/components/student/StudentList"

function StudentCardList() {
	const { apiRequest } = ApiServices()
	const { pathname } = useRouter()
	const [alignment, setAlignment] = React.useState("grid")

	// fetch student data
	const { data, isLoading, isError } = useQuery({
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
			style={{
				overflowY: "scroll",
				overflow: "hidden",
				width: `100%`,
				marginTop: "30px",
			}}
		>
			<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between" }}>
				<Typography
					style={{
						margin: "10px 10px 10px 0px",
						fontWeight: 600,
						fontSize: 19,
						color: "#5f616a",
					}}
				>
					All Students
					<Button
						style={{
							background: "#5f6ac4",
							color: "white",
							boxShadow: "none",
							padding: "1px 10px 0px",
							marginLeft: "10px",
							fontWeight: 600,
						}}
					>
						{data?.data?.length ?? 0} Students
					</Button>
				</Typography>
				<ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
					<ToggleButton value="row" style={{ padding: "0px 5px", height: 35 }}>
						<TableRowsIcon />
					</ToggleButton>
					<ToggleButton value="grid" style={{ padding: "0px 5px", height: 35 }}>
						<ViewModuleIcon />
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			{alignment == "grid" ? (
				<Box
					style={{
						display: "flex",
						flexWrap: "nowrap",
						overflowX: "scroll",
						marginBottom: "45px",
					}}
				>
					{data?.data?.map((item, index) => (
						<Box key={index}>
							<StudentCard studentDetails={item} />
						</Box>
					))}
				</Box>
			) : (
				<Box style={{ display: "flex", flexDirection: "column" }}>
					<Grid container>
						<Grid item xs={12}>
							<StudentList data={data?.data} />
						</Grid>
					</Grid>
				</Box>
			)}
		</Box>
	)
}

export default StudentCardList
