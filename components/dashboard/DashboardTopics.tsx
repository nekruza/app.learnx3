import React from "react"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import SnackbarX from "@/components/other/SnackbarX"
import { Box, Grid, Skeleton, Typography } from "@mui/material"
import ErrorPage from "../ErrorPage"
import ImgMediaCard from "../other/Card"

function DashboardTopics(props) {
	const [open, setOpen] = React.useState(false)

	const { apiRequest } = ApiServices()
	const {
		data: topics,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["lessonByAiTopics"],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonByAiTopics" }),
		refetchOnWindowFocus: false,
	})
	if (isError) return <ErrorPage />

	return (
		<>
			<SnackbarX
				open={open}
				setOpen={setOpen}
				backgroundColor="#32a676"
				message="You have successfully cancelled your sessions!"
			/>
			<Typography
				style={{
					margin: 10,
					fontWeight: 600,
					fontSize: 19,
					color: "#5f616a",
				}}
			>
				Recent topics
			</Typography>
			{
				<Grid container spacing={2}>
					{isLoading
						? [1, 2, 3, 4, 5].map((item) => (
								<Skeleton key={item} variant="rounded" sx={{ margin: "10px", width: "320px", minHeight: "150px" }} />
						  ))
						: topics?.data.length > 0 &&
						  topics.data
								?.sort((a, b) => {
									if (a.createAt > b.createAt) return 1
									if (a.createAt < b.createAt) return -1
									return 0
								})
								.slice(0, 4)
								.map((x, index) => (
									<Grid item xs={12} sm={6} lg={3}>
										<ImgMediaCard title={x.topic} link={`/speak/${x.lessonId}`} />
									</Grid>
								))}
				</Grid>
			}
		</>
	)
}

export default DashboardTopics