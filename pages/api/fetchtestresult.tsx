import { query, collection, where, getDocs } from "firebase/firestore"
import { db } from "../../components/firebaseX"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			const id = req.query.id
			const q = query(collection(db, "testResult"), where("student_id", "==", id))
			const querySnapshot = await getDocs(q)

			const testResult = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				uid: doc.id,
			}))

			res.status(200).json(testResult)
		} catch (error) {
			console.log("error", error)
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
