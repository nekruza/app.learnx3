"use client"
import { brandColors } from "@/components/utils/brandColors"
import { CssBaseline, Box } from "@mui/material"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Bounce, ToastContainer } from "react-toastify"

export default function RootLayout({ children }: any) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: brandColors.tooLightPurple,
        position: 'relative',
      }}
    >
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      <ProtectedRoute permitArray={["admin", "teacher"]}>
        <SidebarContainer>
          {children}
        </SidebarContainer>
      </ProtectedRoute>
    </Box>
  )
}