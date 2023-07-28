import * as React from "react"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

function LinearProgressWithLabel(props) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				mt: 1,
			}}
		>
			<Typography sx={{ margin: "0px 0px 15px", color: "rgb(95, 106, 196)" }}>
				Please complete the test within{props.minutes} minutes.{" "}
			</Typography>
			<Box
				sx={{ width: "100%", mr: 1, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}
			>
				<Box sx={{ width: "100%", mr: { xs: 0, sm: 1 } }}>
					<LinearProgress color="primary" variant="determinate" {...props} />
				</Box>
				<Box display="flex" sx={{ width: "fit-content", alignItems: "center", mt: { xs: 1, sm: 0 } }}>
					<Typography sx={{ fontSize: 22, mr: 1 }}>⏰</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ fontSize: 14, fontWeight: "bold", color: "white", width: "max-content" }}
					>{`${Math.floor((props.minutes * 60 - props.progress) / 60)} min : ${
						(props.minutes * 60 - props.progress) % 60
					} seconds`}</Typography>
				</Box>
			</Box>
		</Box>
	)
}

export default function LinearTimer({ minutes = 10, handleSubmit }) {
	const [progress, setProgress] = React.useState(0)
	const linearN = (100 / (minutes * 60)) * progress

	React.useEffect(() => {
		const timer = setInterval(() => {
			if (progress !== minutes * 60) {
				setProgress(progress < minutes * 60 && progress + 1)
			}
		}, 1000)
		progress === minutes * 60 && handleSubmit()
		return () => {
			clearInterval(timer)
		}
	}, [progress])

	return (
		<Box sx={{ width: "100%" }}>
			<LinearProgressWithLabel value={linearN} progress={progress} minutes={minutes} />
		</Box>
	)
}
