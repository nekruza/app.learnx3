"use client"
import React, { useMemo } from "react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "../api/ApiServices"
import CreateAiLesson from "@/components/dashboard/CreateAiLesson"
import ErrorPage from "../error"
import dayjs from "dayjs"
import LoadingPage from "@/components/LoadingPage"
import { TopicType } from "@/types/types"
import CustomCard from "@/components/other/CustomCard"

function index() {
	const [category, setCategory] = React.useState("All")
	const { apiRequest, fetchAiImages } = ApiServices()

	const { data: topicImages } = useQuery({
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
					<Box sx={{ marginTop: "20px", width: "100%" }}>
						<CreateAiLesson topics={topics?.data} />
						<Box sx={{ width: "100%", display: "flex", mb: 2, overflow: "scroll", maxWidth: "1295px" }}>
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
										<Grid item xs={6} sm={3} lg={2}>
											<CustomCard
												title={x.topic}
												link={`/speak/${x.lessonId}`}
												image={imageX?.url}
												category={x.category}
												createdById={x.createdById}
											/>
										</Grid>
									)
								})}
						</Grid>
					</Box>
				)}
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default index
