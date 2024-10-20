"use client"
import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button, Typography } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import Link from "next/link"
import ApiServices from "@/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/errorpage"
import { useQuery } from "@tanstack/react-query"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { UserType } from "@/types/types"
import CustomAvatar from "@/components/elements/CustomAvatar"

export default function StudentsResult() {
	const { apiRequest } = ApiServices()
	const [selectedLesson, setSelectedLesson] = React.useState(1)

	// fetch student data
	const { data, isLoading, isError } = useQuery({
		queryKey: ["students"],
		queryFn: () => apiRequest("GET", null, { collectionName: "students" }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	// fetch test data
	const {
		data: testResult,
		isLoading: isLoadingT,
		isError: isErrorT,
	} = useQuery({
		queryKey: ["testResult"],
		queryFn: () => apiRequest("GET", null, { collectionName: "testResult" }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const studentList = data?.data

	if (isLoading || isLoadingT) return <LoadingPage />
	if (isError || isErrorT) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher"]}>
			<SidebarContainer>
				<Box sx={{ marginTop: "0px" }}>
					<Typography
						sx={{
							margin: "10px 10px 10px 0px",
							fontWeight: "600",
							fontSize: "19px",
							color: "#5f616a",
						}}
					>
						Students Results
					</Typography>
					<TableContainer
						component={Paper}
						sx={{
							margin: "10px 10px 10px 0px",
							width: "calc(100%)",
							boxShadow: "none",
						}}
					>
						<CssBaseline />
						<Table aria-label="simple table">
							<TableHead>
								<TableRow
									sx={{
										background: "rgb(95, 106, 196)",
										borderRadius: "12px",
										color: "white",
									}}
								>
									<TableCell sx={{ ...TableCellStyle, textAlign: "start" }}>Students ({studentList?.length})</TableCell>
									<TableCell sx={TableCellStyle}># of Tests</TableCell>
									<TableCell sx={TableCellStyle}>Average grade</TableCell>
									<TableCell sx={TableCellStyle}>Points</TableCell>
									<TableCell sx={TableCellStyle}>Profile</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{studentList?.length > 0 &&
									studentList
										?.sort((a: UserType, b: UserType) => {
											if (a.name > b.name) return 1
											if (a.name < b.name) return -1
											return 0
										})
										?.map((student: UserType, index: number) => (
											<TableRowComponent
												key={index}
												student={student}
												testResult={testResult?.data}
												selectedLesson={selectedLesson}
											/>
										))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

const StudentResult = React.memo(({ testResults, studentId, assessmentType }: any) => {
	const testResultArray: number[] = testResults
		?.filter(({ student_id }: { student_id: string }) => student_id === studentId)
		?.map(({ result }: { result: number | string }) => result)

	const sumResult = testResultArray?.reduce((acc: number, curr: number) => acc + curr, 0)
	const averageGrade = sumResult / testResultArray?.length

	return (
		<Typography
			sx={{
				background:
					Number(assessmentType === "averageGrade" ? averageGrade : sumResult) >= 70
						? "rgb(87, 204, 153)"
						: Number(assessmentType === "averageGrade" ? averageGrade : sumResult) >= 40
							? "#ffff3f"
							: Number(assessmentType === "averageGrade" ? averageGrade : sumResult) >= 0
								? "#ff595e"
								: "rgb(222, 226, 230)",
				p: 1,
				m: 0,
				borderRadius: "6px",
				textAlign: "center",
				fontSize: 14,
			}}
		>
			{assessmentType === "averageGrade" && (averageGrade ? Math.round(+averageGrade) + " / 100" : "-")}
			{assessmentType === "points" && (sumResult ? Math.round(+sumResult) : "-")}
			{assessmentType === "numOfTests" && (testResultArray ? testResultArray?.length : "0")}
		</Typography>
	)
})

const TableRowComponent = React.memo(
	({ student, testResult, selectedLesson }: { student: UserType; testResult: number; selectedLesson: number }) => {
		return (
			<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
				<TableCell
					component="th"
					scope="student"
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<CustomAvatar
						image={student?.image}
						gender={student?.gender}
						style={{
							width: 35,
							height: 35,
							marginRight: 1.5,
						}}
					/>
					<p>{student.name}</p>
				</TableCell>
				<TableCell>
					<StudentResult
						testResults={testResult}
						studentId={student.uid}
						assessmentType="numOfTests"
						selectedLesson={selectedLesson}
					/>
				</TableCell>
				<TableCell>
					<StudentResult
						testResults={testResult}
						studentId={student.uid}
						assessmentType="averageGrade"
						selectedLesson={selectedLesson}
					/>
				</TableCell>
				<TableCell>
					<StudentResult
						testResults={testResult}
						studentId={student.uid}
						assessmentType="points"
						selectedLesson={selectedLesson}
					/>
				</TableCell>
				<TableCell sx={{ textAlign: "center" }}>
					<Link href={`/student/${student.uid}`}>
						<Button
							sx={{
								background: "#5f6ac4",
								color: "white",
								boxShadow: "none",
								padding: "0px",
								textTransform: "none",
							}}
						>
							View
						</Button>
					</Link>
				</TableCell>
			</TableRow>
		)
	}
)

const TableCellStyle = { color: "white", fontWeight: "600", fontSize: "15px", textAlign: "center" }
