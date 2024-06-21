"use client"
import { useRecorderPermission } from "./useRecorderPermission"
import axios from "axios"
import { useState } from "react"

interface RecorderProps {
	fileName: string
}

const Recorder = () => {
	const recorder = useRecorderPermission("audio")
	const [myFilePath, setMyFilePath] = useState("")

	const startRecording = async () => {
		recorder.startRecording()
	}

	const stopRecording = async () => {
		await recorder.stopRecording()
		let blob = await recorder.getBlob()
		const { data } = await axios.post("/api/save-audio", blob)

		setMyFilePath(data.filePath)

		const { data: dataX } = await axios.post(
			"/api/speech-to-text",
			{
				myFilePath: data.filePath,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		console.log("dataX :>> ", dataX)

		// invokeSaveAsDialog(blob, `${fileName}.webm`)
	}

	return (
		<div>
			<button onClick={startRecording}> Start recording</button>
			<button onClick={stopRecording}> Stop recording</button>
			{myFilePath && <audio controls src={myFilePath} />}
		</div>
	)
}

export default Recorder
