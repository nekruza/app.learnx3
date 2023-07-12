import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { Box, capitalize, Container, Grid, Typography } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import BackButton from "@/components/other/BackButton"
import { LessonIntro } from "@/components/curriculum/LessonIntro"
import { VocabularyCard } from "@/components/curriculum/VocabularyCard"
import { TestContainer } from "@/components/assessment/TestContainer"
import SidebarContainer from "@/components/SidebarContainer"
import ErrorPage from "../error"
import SpeakingInfo from "./SpeakingInfo"
import { SpeakCard } from "@/components/curriculum/SpeakCard"

export default function VocabularyPage() {
	const { apiRequest } = ApiServices()

	// Fetch curriculum
	const { data, isLoading, isError } = useQuery({
		queryKey: ["speakEnglish"],
		queryFn: () => apiRequest("GET", null, { collectionName: "speakEnglish" }),
		refetchOnWindowFocus: false,
	})

	console.log("data :>> ", data)

	const schoolInfo = data?.data.filter((item) => item.topic === "School")[0]

	console.log("schoolInfo :>> ", schoolInfo)
	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<SidebarContainer>
			<Box
				sx={{
					display: "flex",
					position: "relative",
					width: "100%",
				}}
			>
				<Container
					sx={{
						padding: "20px 5px",
						color: "white",
						height: "100%",
						display: "flex",
						justifyContent: "start",
						alignItems: "center",
						flexDirection: "column",
						boxSizing: "border-box",
					}}
				>
					<SpeakingInfo topic={schoolInfo.topic} image="/vocabulary-image.png" />

					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							justifyContent: "center",
							background: "white",
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
							borderRadius: 3,
							width: "100%",
							p: "20px 0px",
						}}
					>
						<Typography style={{ color: "black", margin: "10px 30px", fontWeight: 600, fontSize: 19 }}>
							{" "}
							📒 Words of the day!
						</Typography>
						{schoolInfo?.vocabularies?.map((item) => (
							<Box sx={{ p: 2 }}>
								<Typography style={{ color: "black", margin: "10px 30px 10px 5px", fontWeight: 500, fontSize: 17 }}>
									✨ {capitalize(item.type)}
								</Typography>
								<Grid spacing={2} container>
									{item.words.map((x) => (
										<Grid item xs={12} sm={6} md={3} key={item.id}>
											<SpeakCard word={x} backgroundColor={lessonColors[item.type]} />
										</Grid>
									))}
								</Grid>
							</Box>
						))}
					</Box>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							justifyContent: "center",
							background: "white",
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
							borderRadius: 3,
							width: "100%",
							p: "20px 0px",
							mt: 3,
						}}
					>
						<Typography style={{ color: "black", margin: "10px 30px", fontWeight: 600, fontSize: 19 }}>
							{" "}
							📣 Most common phrases!
						</Typography>
						<Box>
							<Grid spacing={2} container>
								{schoolInfo?.phrases.map((item, index) => (
									<Grid item xs={12} key={item.id}>
										<Box
											key={index}
											sx={{
												display: "flex",
												alignItems: "center",
												m: "5px 20px",
												padding: "15px",
												borderRadius: 2,
												color: "#323331",
												background: "#dbf48212",
												boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
											}}
										>
											<Typography
												sx={{
													fontSize: 16,
													padding: "5px 10px",
													background: "#f4f482",
													borderRadius: 2,
													width: "fit-content",
													mr: 2,
													color: "white",
													minWidth: "fit-content",
												}}
											>
												🏀{" "}
											</Typography>
											<Typography sx={{ fontSize: 16 }}> {item}</Typography>
										</Box>
									</Grid>
								))}
							</Grid>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							justifyContent: "center",
							background: "white",
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
							borderRadius: 3,
							width: "100%",
							p: "20px 0px",
							mt: 3,
						}}
					>
						<Typography style={{ color: "black", margin: "10px 30px", fontWeight: 600, fontSize: 19 }}>
							{" "}
							📣 Conversation!
						</Typography>
						<Box>
							<Grid spacing={2} container>
								{schoolInfo?.conversation.content.map((item, index) => (
									<Grid item xs={12} key={item.id}>
										<Box
											key={index}
											sx={{
												display: "flex",
												alignItems: "center",
												m: "5px 20px",
												padding: "15px",
												borderRadius: 2,
												color: "#323331",
												background: "#ffadad0a",
												boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
											}}
										>
											<Typography
												sx={{
													fontSize: 16,
													padding: "5px 10px",
													background: item.speaker === "Student" ? "#06d6a0" : "rgb(95, 97, 196)",
													borderRadius: 2,
													width: "fit-content",
													mr: 2,
													color: "white",
													minWidth: "fit-content",
												}}
											>
												{item.speaker === "Student" ? <span>👩‍🎓</span> : <span>👨‍🏫</span>} {item.speaker}
											</Typography>
											<Typography sx={{ fontSize: 16 }}> {item.content}</Typography>
										</Box>
									</Grid>
								))}
							</Grid>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							justifyContent: "center",
							background: "white",
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
							borderRadius: 3,
							width: "100%",
							p: "20px 0px",
							mt: 3,
						}}
					>
						<Typography style={{ color: "black", margin: "10px 30px", fontWeight: 600, fontSize: 19 }}>
							{" "}
							🙋‍♀️ Questions to ask!
						</Typography>
						<Box>
							<Grid spacing={2} container>
								{schoolInfo?.questions.map((item, index) => (
									<Grid item xs={12} key={item.id}>
										<Box
											key={index}
											sx={{
												display: "flex",
												alignItems: "center",
												m: "5px 20px",
												padding: "15px",
												borderRadius: 2,
												color: "#323331",
												background: "#ffadad0a",
												boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
											}}
										>
											<Typography
												sx={{
													fontSize: 16,
													padding: "5px 10px",
													background: "#f48282",
													borderRadius: 2,
													width: "fit-content",
													mr: 2,
													color: "black",
													minWidth: "fit-content",
												}}
											>
												⁉️{" "}
											</Typography>
											<Typography sx={{ fontSize: 16 }}> {item}</Typography>
										</Box>
									</Grid>
								))}
							</Grid>
						</Box>
					</Box>
					{/* <TestContainer data={lessonState?.data} link={`/test/word-building/`} /> */}
				</Container>
				<BackButton />
			</Box>
		</SidebarContainer>
	)
}

export const lessonColors = {
	noun: "#e2e6fb4d",
	verb: "rgb(255 139 79 / 20%)",
	adverb: "rgb(65 182 255 / 20%)",
	adjective: "rgb(94 196 151 / 20%)",
}
