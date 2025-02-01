// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getVertexAI, getGenerativeModel } from "firebase/vertexai"

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Initialize Vertex AI
const vertexAI = getVertexAI(app)
const generativeModel = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" })

// const analytics = getAnalytics(app);

export { app, auth, db, storage, generativeModel }
