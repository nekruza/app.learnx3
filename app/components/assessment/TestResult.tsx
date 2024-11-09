"use client"
import { memo, useMemo } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CssBaseline from "@mui/material/CssBaseline"
import { Box, Grid } from "@mui/material"
import { BarChart } from "../other/BarChart"
import ErrorPage from "@/errorpage"
import ApiServices from "@/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import LoadingPage from "@/components/LoadingPage"
import { TestTableRow } from "./TestTableRow"
import { TestResultType } from "@/types/types"

const TestResult = memo(({ id }: { id: string }) => {
	const { fetchTestResults } = ApiServices()
	const {
		data: testResult,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [`testResult-${id}`],
		queryFn: () => fetchTestResults(id),
		refetchOnWindowFocus: false,
	})

	// Titles
	const title = ["Test", "Topic", "Test Score"]

	// Student performance data for Charts
	const studentResult: number[] =
		useMemo(() => testResult?.data.map((item: TestResultType) => item.result), [testResult?.data]) || []

	const testTopics: string[] =
		useMemo(
			() => testResult?.data.map((item: TestResultType) => item.topic.slice(0, 15) + "..."),
			[testResult?.data]
		) || []

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Grid container spacing={2} sx={{ marginTop: "0px", display: "flex", padding: 0 }}>
			<Grid item xs={12} sm={6}>
				<TableContainer
					component={Paper}
					sx={{
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
								{title.map((item, index) => (
									<TableCell
										key={index}
										sx={{
											color: "white",
											fontWeight: "600",
											fontSize: ["14px", "15px"],
											margin: "auto",
											textAlign: "center",
										}}
									//
									>
										{item}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{testResult?.data.length > 0 &&
								testResult?.data
									.sort((a: TestResultType, b: TestResultType) => {
										if (a.createdAt > b.createdAt) return 1
										if (a.createdAt < b.createdAt) return -1
										return 0
									})
									?.map((row: TestResultType, index: number) => <TestTableRow key={index} row={row} index={index} />)}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box
					sx={{
						padding: "15px",
						background: "white",
						flex: 1,
						borderRadius: 2,
					}}
				>
					<BarChart dataProp={studentResult} labelsProp={testTopics} />
				</Box>
			</Grid>
		</Grid>
	)
})

export default TestResult
