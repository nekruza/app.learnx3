"use client"
import { brandColors } from "@/components/utils/brandColors"
import { CssBaseline, Box } from "@mui/material"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"

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
      <ProtectedRoute permitArray={["admin", "teacher"]}>
        <SidebarContainer>
          {children}
        </SidebarContainer>
      </ProtectedRoute>
    </Box>
  )
}