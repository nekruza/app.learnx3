import React, { useMemo } from "react"
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
import { TopicType } from "@/types/types"

function index() {
	const [category, setCategory] = React.useState("All")
	const { botComponentWidth } = useStoreTemporary()
	const { apiRequest, fetchAiImages } = ApiServices()

	const { data: topicImages, isError: isErrorImages } = useQuery({
		queryKey: ["topicImages"],
		queryFn: () => fetchAiImages(),
		refetchOnWindowFocus: false,
	})

	const {
		data: topics,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["lessonByAiTopics"],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonByAiTopics" }),
		refetchOnWindowFocus: false,
	})

	const topicCategories: string[] = useMemo(
		() =>
			topics?.data
				?.sort((a: TopicType, b: TopicType) => a.category?.localeCompare(b.category))
				?.map(({ category }: { category: string }) => category)
				?.filter((value: string, index: number, self: string) => self.indexOf(value) === index),
		[topics?.data]
	)

	if (isError || isErrorImages) return <ErrorPage />
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
							.sort((a: TopicType, b: TopicType) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
							.filter((x: TopicType) => (category === "All" ? x : x.category === category))
							.map((x: TopicType) => {
								const imageX = topicImages?.data.find(({ name }: { name: string }) => name === x?.imagePath)

								return (
									<Grid item xs={6} sm={botComponentWidth === 900 ? 4 : 3} lg={botComponentWidth === 900 ? 4 : 2}>
										<ImgMediaCard title={x.topic} link={`/speak/${x.lessonId}`} image={imageX} />
									</Grid>
								)
							})}
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default index
