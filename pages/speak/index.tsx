import React from "react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "../api/ApiServices"
import ImgMediaCard from "@/components/other/Card"
import CreateAiLesson from "@/components/dashboard/CreateAiLesson"
import ErrorPage from "../error"
import dayjs from "dayjs"
import LoadingPage from "@/components/LoadingPage"
import { useStoreTemporary } from "@/components/zustand"

function index() {
	const [category, setCategory] = React.useState("All")
	const { botComponentWidth } = useStoreTemporary()
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

	const topicCategories = topics?.data
		?.sort((a, b) => a.category?.localeCompare(b.category))
		?.map(({ category }) => category)
		?.filter((value, index, self) => self.indexOf(value) === index)

	if (isError) return <ErrorPage />
	if (isLoading) return <LoadingPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<Box sx={{ marginTop: "20px", width: "100%" }}>
					<CreateAiLesson />
					<Box sx={{ width: "100%", display: "flex", mb: 2, overflow: "scroll" }}>
						{["All", ...topicCategories]?.map((categoryX) => (
							<Typography
								onClick={() => setCategory(categoryX)}
								sx={{
									cursor: "pointer",
									background: categoryX === category ? "#282828" : "#f2f2f2",
									color: categoryX === category ? "white" : "#282828",
									mr: "8px",
									p: "4px 16px",
									borderRadius: 2,
									width: "fit-content",
									minWidth: "fit-content",
								}}
							>
								{" "}
								{categoryX?.toLowerCase()}
							</Typography>
						))}
					</Box>
					<Grid container spacing={2}>
						{topics?.data
							.sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
							.filter((x) => (category === "All" ? x : x.category === category))
							.map((x) => (
								<Grid item xs={12} sm={botComponentWidth === 900 ? 4 : 3} lg={botComponentWidth === 900 ? 4 : 2}>
									<ImgMediaCard title={x.topic} link={`/speak/${x.lessonId}`} />
								</Grid>
							))}
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default index
