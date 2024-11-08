"use client"
import { ArrowBack } from "@mui/icons-material"
import { brandColors } from "@/components/utils/brandColors"
import { Button, CssBaseline, Box } from "@mui/material"
import Link from "next/link"
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
      <Link href="/ai-presentation">
        <Button
          sx={{
            color: '#4B5563',
            textTransform: 'none',
            fontSize: '1rem',
            padding: '8px 16px',
            margin: '16px',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
      </Link>
      <CssBaseline />
      <ProtectedRoute permitArray={["admin", "teacher"]}>
        <SidebarContainer>
          {children}
        </SidebarContainer>
      </ProtectedRoute>
    </Box>
  )
}