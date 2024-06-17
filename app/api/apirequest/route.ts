// pages/api/firebase-handler.js
import { collection, addDoc, query, getDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/components/firebaseX"
import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
	const collectionName = request.nextUrl.searchParams.get("collectionName")
	const uid = request.nextUrl.searchParams.get("uid")
	const role = request.nextUrl.searchParams.get("role")

	const body = await request.json()

	// Clerk auth check
	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		const docRef = await addDoc(collection(db, collectionName as string), body)
		return NextResponse.json({ docRef }, { status: 200 })
	} catch (error) {
		console.error("Error adding document:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}

export async function GET(request: NextRequest) {
	const collectionName = request.nextUrl.searchParams.get("collectionName")
	const uid = request.nextUrl.searchParams.get("uid")

	// Clerk auth check
	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		if (uid) {
			const docRef = doc(db, collectionName as string, uid)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				return NextResponse.json(docSnap.data(), { status: 200 })
			} else {
				return NextResponse.json({ message: "Document not found" }, { status: 404 })
			}
		} else {
			const docsArray: any = []
			const q = query(collection(db, collectionName as string))
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach((doc) => {
				docsArray.push({ ...doc.data(), uid: doc.id })
			})

			return NextResponse.json(docsArray, { status: 200 })
		}
	} catch (error) {
		console.error("Error getting documents:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}

export async function PATCH(request: NextRequest) {
	const collectionName = request.nextUrl.searchParams.get("collectionName")
	const uid = request.nextUrl.searchParams.get("uid")
	const role = request.nextUrl.searchParams.get("role")

	const body = await request.json()

	// Clerk auth check
	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		if (role === "admin" || true) {
			const docRef = await updateDoc(doc(db, collectionName as string, uid as string), body)
			return NextResponse.json({ docRef }, { status: 200 })
		} else {
			return NextResponse.json({ message: "You do not have authority to do this action." }, { status: 403 })
		}
	} catch (error) {
		console.error("Error updating document:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}

export async function DELETE(request: NextRequest) {
	const collectionName = request.nextUrl.searchParams.get("collectionName")
	const uid = request.nextUrl.searchParams.get("uid")
	const role = request.nextUrl.searchParams.get("role")

	// Clerk auth check
	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		if (role === "admin" || true) {
			const docRef = await deleteDoc(doc(db, collectionName as string, uid as string))
			return NextResponse.json({ docRef }, { status: 200 })
		} else {
			return NextResponse.json({ message: "You do not have authority to do this action." }, { status: 403 })
		}
	} catch (error) {
		console.error("Error deleting document:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
