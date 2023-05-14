import React, { useEffect } from "react"
import Head from "next/head"
import { db } from "./firebaseX"
import { getDoc, doc } from "firebase/firestore"
import { useStoreUser } from "./zustand"
import { Inter } from "next/font/google"
import { Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebaseX"
import LoginWithPhone from "./auth/User/SignInPhone"
import SignUp from "./auth/User/SignUp"
import Login from "./auth/User/SignIn"
import AppContainer from "./components/AppContainer"
import MyDashboard from "./components/MyDashboard"
import ClassStatistics from "./components/ClassStatistics"
import ClassStudents from "./components/Student/ClassStudents"
import MySettings from "./components/MySettings"
import StudentProfile from "./components/Student/StudentProfile"
import ProtectedRoute from "./auth/ProtectedRoutes/ProtectedRoute"
import UserInfo from "./auth/FirstTimeLogin/UserInfo"
import ForgotPassword from "./auth/User/ForgotPassword"
import Curriculum from "./components/Curriculum/Curriculum"
import EnglishTest from "./components/Assessment/EnglishTest"
import Test from "./components/Assessment/Test"
import EnglishWriting from "./components/Writing/EnglishWriting"
import Writing from "./components/Writing/Writing"
import VirtualTeacher from "./components/VirtualTeacher"
import Resources from "./components/Resources"
import StudentInfo from "./auth/FirstTimeLogin/StudentInfo"
import Iam from "./auth/FirstTimeLogin/Iam"
import ErrorPage from "./components/Components/ErrorPage"
import StudentProtectedRoute from "./auth/ProtectedRoutes/StudentProtectedRoute"
import TeacherProtectedRoute from "./auth/ProtectedRoutes/TeacherProtectedRoute"
import LessonPage from "./components/Curriculum/LessonPage"
import GradeWritingPage from "./components/Writing/GradeWritingPage"
import GradeWritingList from "./components/Writing/GradeWritingList"
import SchoolPage from "./components/School/SchoolPage"
import AuthContainer from "./auth/User/AuthContainer"
import EachCurriculum from "./components/Curriculum/EachCurriculum"
import VocabularyPage from "./components/Curriculum/VocabularyPage"
import WordBuildingTest from "./components/Assessment/WordBuildingTest"
import ReadingPage from "./components/Curriculum/ReadingPage"
import TrueFalseQuiz from "./components/Assessment/TrueFalseQuiz"
import { CssBaseline } from "@mui/material"
import WritingPage from "./components/Curriculum/WritingPage"
import WritingTest from "./components/Assessment/WritingTest"
import SpeakingPage from "./components/Curriculum/SpeakingPage"



export default function Home() {
  const [loading, setLoading] = React.useState(false)
  const { userInfo, setUserInfo, userLogin, setUserLogin } = useStoreUser()
  const [currentUser, setCurrentUser] = React.useState(null)

  // Fetch current user data
  async function fetchData(uid: string) {
    setLoading(true)
    try {
      const docRef = doc(db, "teachers", uid)
      const usersData = await getDoc(docRef)

      const docRefStudent = doc(db, "students", uid)
      const usersDataStudent = await getDoc(docRefStudent)

      if (usersData.exists()) {
        setUserInfo(usersData.data())
        setCurrentUser(usersData.data())
      } else if (usersDataStudent.exists()) {
        setUserInfo(usersDataStudent.data())
        setCurrentUser(usersDataStudent.data())
      } else {
        console.log("No such document!")
      }
      setLoading(false)
    } catch (error) {
      console.log("fetchData :>> ", error)
    }
  }

  // set logged in user and fethced user data
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(user)
        fetchData(user.uid)
      } else {
        // User is signed out
        setUserLogin(null)
        fetchData(null)
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>LearnX3 App</title>
        <meta name="description" content="English Language teaching platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Routes>
        <Route path="/auth" element={<AuthContainer />}>
          <Route path="login" element={<Login />} />
          <Route path="login-phone" element={<LoginWithPhone />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route
          element={<ProtectedRoute user={userLogin} userInfo={userInfo} />}
        >
          <Route path="who-iam" element={<Iam />} />
          <Route path="user-info" element={<UserInfo />} />
          <Route path="student-info" element={<StudentInfo />} />
          <Route path="/" element={<AppContainer />}>
            <Route index element={<SchoolPage />} />
            <Route path="class/:id" element={<MyDashboard />} />
            <Route path="class-curriculum" element={<Curriculum />} />
            <Route path="class-curriculum/:id" element={<EachCurriculum />} />
            <Route
              path="class-curriculum/:id/vocabulary/:lessonId"
              element={<VocabularyPage />}
            />
            <Route
              path="class-curriculum/:id/reading/:lessonId"
              element={<ReadingPage />}
            />
            <Route
              path="class-curriculum/:id/writing/:lessonId"
              element={<WritingPage />}
            />
            <Route
              path="class-curriculum/:id/speaking/:lessonId"
              element={<SpeakingPage />}
            />
            <Route path="student/:id" element={<StudentProfile />} />
            <Route path="settings" element={<MySettings />} />
            <Route path="resources" element={<Resources />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="grade-writing/:id" element={<GradeWritingPage />} />
            <Route path="virtual-teacher" element={<VirtualTeacher />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

            <Route element={<TeacherProtectedRoute user={currentUser} />}>
              <Route
                path="class/:id/class-students"
                element={<ClassStudents />}
              />
              <Route path="class-statistics" element={<ClassStatistics />} />
              <Route path="grade-writing" element={<GradeWritingList />} />
            </Route>

            {/* <Route element={<StudentProtectedRoute user={currentUser} />}> */}
            <Route path="test" element={<EnglishTest />} />
            <Route path="test/true-false/:id" element={<TrueFalseQuiz />} />
            <Route
              path="test/word-building/:id"
              element={<WordBuildingTest />}
            />
            <Route path="test/writing/:id" element={<WritingTest />} />
            <Route path="test/:id" element={<Test />} />
            <Route path="writing" element={<EnglishWriting />} />
            <Route path="writing/:id" element={<Writing />} />
            {/* </Route> */}
          </Route>
        </Route>
      </Routes>
    </>
  )
}
