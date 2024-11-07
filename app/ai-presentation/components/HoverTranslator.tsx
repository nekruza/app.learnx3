"use client"
import React, { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react"
import { Box, Button, IconButton, Tooltip, tooltipClasses, Typography, Zoom } from "@mui/material"
import axios from "axios"
import GTranslateIcon from "@mui/icons-material/GTranslate"
import { brandColors } from "../../components/utils/brandColors"
import { TailSpin } from "react-loading-icons"
import { styled } from "@mui/system"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import StopCircleIcon from "@mui/icons-material/StopCircle"
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const LightTooltip = styled(({ className, ...props }: any) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "white",
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
		fontSize: 11,
		padding: "2px",
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: "white",
	},
}));


export default function HoverAudioTranslator({
	text,
	fontColor,
	flexDirection,
	children,
}: {
	text: string
	fontSize?: number | string
	fontColor?: string
	iconColor?: string
	translateIconWidth?: string | number
	flexDirection?: "row" | "column"
	children: any
}) {
	const [translatedText, setTranslatedText] = useState("")
	const [open, setOpen] = useState(false)
	const [propText, setPropText] = useState("")
	const [loading, setLoading] = useState(false)
	const [audioError, setAudioError] = useState<string | null>(null)
	const [audioURL, setAudioURL] = useState<string | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const audioRef = useRef<HTMLAudioElement | null>(null)


	const togglePlay = () => {
		if (!audioRef.current) {
			console.log("No audio ref found")
			return
		}

		try {
			if (isPlaying) {
				audioRef.current.pause()
			} else {
				const playPromise = audioRef.current.play()
				if (playPromise !== undefined) {
					playPromise
						.then(() => {
							setIsPlaying(true)
						})
						.catch(error => {
							console.error("Error playing audio:", error)
						})
				}
			}
			setIsPlaying(!isPlaying)
		} catch (error) {
			console.error("Toggle play error:", error)
		}
	}



	return (
		<Box
			display={text ? "flex" : "none"}
			flexDirection={flexDirection ?? "column"}
			gap={"4px"}
			mt={"6px"}
			maxWidth={"100%"}
		>
			{audioURL && (
				<audio
					ref={audioRef}
					src={audioURL}
					onEnded={() => setIsPlaying(false)}
					preload="auto"
					controls={false}
				/>
			)}

			<Box display={"flex"} alignItems={"center"} maxWidth={"100%"} flex={4}>
				<ClickAwayListener onClickAway={() => setOpen(false)}>
					<div>
						<LightTooltip PopperProps={{
							disablePortal: true,
						}}
							onClose={() => setOpen(false)}
							open={open}
							disableFocusListener
							disableHoverListener
							disableTouchListener
							TransitionComponent={Zoom}
							title={<MyComponent audioRef={audioRef} togglePlay={togglePlay} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioURL={audioURL} setAudioURL={setAudioURL} text={text} loading={loading} setLoading={setLoading} audioError={audioError} setAudioError={setAudioError} translatedText={translatedText} setTranslatedText={setTranslatedText} propText={propText} setPropText={setPropText} />}
							placement="top-end"
							arrow
						>
							<Box
								sx={{ cursor: "pointer" }}
								onClick={(e: any) => {
									e.stopPropagation();
									setOpen(!open);
								}}
							>
								{children}
							</Box>
						</LightTooltip>
					</div>
				</ClickAwayListener>
			</Box>
			<Box
				display={"flex"}
				flexDirection={flexDirection ?? "row"}
				gap={1}
				maxWidth={"100%"}
				flex={translatedText ? 3 : 0}
				padding={"0px 2px"}
			>
				{loading ? (
					<TailSpin style={{ width: "20px" }} stroke={brandColors.darkBlue} />
				) : (
					translatedText && (
						<Box
							display={propText !== text ? "none" : "flex"}
							width={"100%"}
							alignItems={"center"}
							justifyContent={"center"}
							borderRadius={"8px"}
							bgcolor={"#F9F9F9"}
							padding={"4px 8px"}
							flexDirection="column"
						>
							<Typography fontSize={14} color={fontColor ?? brandColors.darkerGrey}>
								{translatedText}
							</Typography>
							{audioError && (
								<Typography fontSize={12} color="#ef233c" mt={1}>
									{audioError}
								</Typography>
							)}
						</Box>
					)
				)}
			</Box>
		</Box>
	)
}



const MyComponent = React.forwardRef(function MyComponent({ text, isPlaying, togglePlay, audioURL, setAudioURL, translatedText, setTranslatedText, setPropText, setLoading, setAudioError }: { text: string, audioRef: MutableRefObject<HTMLAudioElement | null>, isPlaying: boolean, setIsPlaying: Dispatch<SetStateAction<boolean>>, togglePlay: () => void, audioURL: string | null, setAudioURL: Dispatch<SetStateAction<string | null>>, translatedText: string, setTranslatedText: Dispatch<SetStateAction<string>>, propText: string, setPropText: Dispatch<SetStateAction<string>>, loading: boolean, setLoading: Dispatch<SetStateAction<boolean>>, audioError: string | null, setAudioError: Dispatch<SetStateAction<string | null>> }, ref: any) {
	const [targetLanguage, setTargetLanguage] = useState("Russian")
	const [audioLoading, setAudioLoading] = useState(false)


	const handleAudioGeneration = async () => {
		setAudioLoading(true)
		if (!text) return

		try {
			const audioResponse = await axios.post("/api/text-to-speech", {
				message: text,
			})
			setAudioURL(audioResponse.data.audioURL)
		} catch (error) {
			console.error("Error generating audio:", error)
			setAudioError("Failed to generate audio.")
		} finally {
			setAudioLoading(false)
		}
	}

	const handleTranslate = async () => {
		setLoading(true)
		setPropText(text)
		try {
			if (!translatedText) {
				const response = await axios.post("/api/translate", { text: text, targetLanguage })
				const data = response.data
				setTranslatedText(data.translatedText)
			}
		} catch (error) {
			console.error("Error translating text:", error)
			setTranslatedText("Failed to translate text")
		} finally {
			setLoading(false)
		}
	}
	//  Spread the to the underlying DOM element.
	return (
		<div ref={ref}>
			<Box display={"flex"} alignItems={"center"} width={"fit-content"}>

				<IconButton onClick={() => {
					text && handleTranslate()
				}}>
					<GTranslateIcon sx={{ color: brandColors.lightPurple }} />
				</IconButton>


				<Box>
					{!audioURL ? (
						<>
							{audioLoading ? (
								<TailSpin style={{ width: "20px", margin: "0px 4px" }} stroke={brandColors.darkBlue} />
							) : (
								<IconButton
									onClick={handleAudioGeneration}
									sx={{ color: brandColors.lightPurple }}
								>
									<HeadphonesIcon />
								</IconButton>
							)}
						</>
					) : (
						<IconButton
							onClick={togglePlay}
							sx={{ color: brandColors.lightPurple }}
						>
							{isPlaying ? <StopCircleIcon /> : <PlayCircleIcon />}
						</IconButton>
					)}
				</Box>
			</Box>
		</div >
	);
});