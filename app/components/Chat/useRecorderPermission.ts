import { useState, useEffect } from "react"
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc"

export const useRecorderPermission = (recordingType: RecordRTC.Options["type"]) => {
	const [recorder, setRecorder] = useState<any>()

	useEffect(() => {
		getPermissionInitializeRecorder()
	}, [])

	const getPermissionInitializeRecorder = async () => {
		let stream = await (navigator as any).mediaDevices.getUserMedia({
			video: false,
			audio: true,
		})
		let recorder = new RecordRTCPromisesHandler(stream, {
			type: recordingType,
		})
		setRecorder(recorder)
	}

	return recorder
}
