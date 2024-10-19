import { auth } from "./firebaseX"
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material"
import AccountMenu from "./auth/SignOut"
import { useStoreUser } from "./zustand"
import { useQuery } from "@tanstack/react-query"
import { TestResultType } from "@/types/types"
import { useMemo } from "react"
import ApiServices from "../api/ApiServices"
import { brandColors } from "./utils/brandColors"
import Link from "next/link"
import PricingModal from "./pricing/PricingModal"

const Navbar = () => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const { userInfo } = useStoreUser()
	const { fetchTestResults } = ApiServices()

	// get assessment result
	const { data: testResults } = useQuery({
		queryKey: [`mySumTestResult}`],
		queryFn: () => fetchTestResults(String(userInfo?.uid)),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const getStudentTotalScore = useMemo(() => {
		const totalScore = testResults?.data?.reduce((acc: number, curr: TestResultType) => acc + Number(curr.result), 0)
		return Math.round(totalScore) ?? 0
	}, [testResults])

	return (
		<Box
			//@ts-ignore
			sx={BoxWrapperStyle}
		>
			<Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
				<Box display="flex" alignItems="center">
					<Typography
						fontWeight="bold"
						noWrap
						sx={{ margin: "0px 2px", color: brandColors.black, fontSize: { xs: 20 }, maxWidth: { xs: 200, sm: 400 } }}
					>
						{auth?.currentUser ? "Hello, " + auth?.currentUser?.displayName + " 👋" : "Hello"}
					</Typography>
				</Box>
				<Box display="flex" alignItems="center">
					<Box display="flex" alignItems="center" justifyContent="start" width="100%" gap={1}>
						{userInfo.role === "admin" && (
							<Link href="/home/admin" passHref>
								<Button
									sx={{
										background: "#5f6ac4",
										color: "white",
										boxShadow: "none",
										padding: "1px 20px 0px",
										marginX: "10px",
										"&:hover": { background: "#5f6ad9", transform: "scale(1.05)", transition: "all 0.3s" },
									}}
								>
									Admin
								</Button>
							</Link>
						)}
						<Typography variant="body2" sx={TypographyStyle}>
							Level {Math.floor(getStudentTotalScore / 400) + 1}
						</Typography>
						<Typography variant="body2" sx={TypographyStyle}>
							⭐️ {getStudentTotalScore}
						</Typography>
						<Box display={["none", "flex"]} alignItems="center">
							{((userInfo?.role === "student" && !userInfo?.paid) || userInfo?.role === "admin") && (
								<PricingModal buttonText="Upgrade to Pro" />
							)}
						</Box>
					</Box>

					<AccountMenu isSmallScreen={isSmallScreen} />
				</Box>
			</Box>
		</Box>
	)
}

export default Navbar

const BoxWrapperStyle = {
	color: "white",
	maxWidth: "none",
	alignItems: "center",
	marginBottom: { xs: 3, sm: 5 },
	display: { xs: "flex", sm: "flex" },
	flexDirection: { xs: "column", sm: "row" },
	justifyContent: "space-between",
}

const TypographyStyle = {
	fontSize: 12,
	color: "#32325d",
	textAlign: "center",
	border: "1px solid #32325d",
	borderRadius: "12px",
	padding: "1px 12px",
	width: "fit-content",
	margin: "5px 4px 5px 2px",
}
