"use client"
import React, { useMemo, useDeferredValue } from "react"
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
	const [search, setSearch] = React.useState("")
	const deferredSearch = useDeferredValue(search)
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
		[topics?.data],
	)

	const filteredTopics = useMemo(() => {
		if (!topics?.data) return []

		return topics.data
			.filter((x: TopicType) => x.topic.toLowerCase().includes(deferredSearch.toLowerCase()))
			.sort((a: TopicType, b: TopicType) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
			.filter((x: TopicType) => (category === "All" ? true : x.category === category))
	}, [topics?.data, deferredSearch, category])

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
						<Box sx={{ width: "100%", display: "flex", mb: 2, overflow: "scroll", maxWidth: "1295px" }}>
							<input
								title="Search"
								type="text"
								placeholder="Search"
								value={search}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setSearch(e.target.value)
								}}
								style={{
									width: "100%",
									padding: "10px 15px",
									borderRadius: "8px",
									border: "1px solid #e0e0e0",
									fontSize: "16px",
									outline: "none",
									transition: "all 0.3s ease",
									boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
								}}
							/>
						</Box>
						<Grid container spacing={2}>
							{filteredTopics.map((x: TopicType) => {
								const imageX = topicImages?.data.find(({ name }: { name: string }) => name === x?.imagePath)

								return (
									<Grid item xs={6} sm={3} lg={2} key={x.lessonId}>
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
