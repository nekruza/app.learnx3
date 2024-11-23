import axios from "axios"
import { useStoreUser } from "@/components/zustand"

function ApiServices() {
	const { userInfo } = useStoreUser()

	async function fetchStudentData(studentId: string) {
		const response = await axios.get(`/api/fetchstudent`, {
			params: {
				studentId: studentId,
			},
		})
		return response
	}

	async function fetchAllStudents() {
		const response = await axios.get(`/api/fetchallstudents`)
		return response
	}

	async function fetchAiImages(imagePath?: string) {
		const response = await axios.get(`/api/fetchfromstorage`, {
			params: {
				imagePath: imagePath,
			},
		})
		return response
	}

	async function fetchAllTeachers() {
		const response = await axios.get(`/api/fetchallteachers`)
		return response
	}

	async function fetchTestResults(id: string) {
		const response = await axios.get(`/api/fetchtestresult`, {
			params: {
				id: id,
			},
		})
		return response
	}

	async function fetchOneLessonByAi(id: string) {
		const response = await axios.get(`/api/fetchonelessonbyai`, {
			params: {
				id,
			},
		})
		return response
	}

	interface ApiRequestParams {
		collectionName: string
		uid?: string | number
	}

	async function apiRequest(
		method: "POST" | "GET" | "PATCH" | "PUT" | "DELETE" = "GET",
		body: any = null,
		params: ApiRequestParams
	) {
		const updatedBody =
			method === "POST"
				? {
					...body,
					createdAt: `${new Date().toISOString()}`,
					createdById: `${userInfo.uid}`,
					createdByName: `${userInfo.name}`,
				}
				: body
		return await axios({
			method,
			url: "/api/apirequest",
			data: updatedBody,
			params,
		})
	}

	return {
		fetchStudentData,
		fetchAllStudents,
		fetchAllTeachers,
		fetchTestResults,
		fetchOneLessonByAi,
		apiRequest,
		fetchAiImages,
	}
}

export default ApiServices
