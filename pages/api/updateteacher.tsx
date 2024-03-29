import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../components/firebaseX"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "PATCH") {
		const { id } = req.query
		const body = req.body

		try {
			const docRef = await doc(db, "teachers", id as string)
			const response = await updateDoc(docRef, body)
			res.status(200).json({ response })
		} catch (error) {
			res.status(500).json({
				message: "Internal Server Error",
			})
		}
	} else {
		res.status(404).json({
			message: "Invalid HTTP method",
		})
	}
}
