import { Button } from "@mui/material";
import { brandColors } from "@/components/utils/brandColors";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function PresentationMainCard() {
  return (
    <Box sx={{
      ...ComponentWrapperStyle, backgroundImage: 'url(/ai-ppt-images/ai-ppt-bg.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}>
      <Box sx={{
        display: 'flex', flexDirection: 'column', background: "#432b85", borderRadius: "10px",
        gap: 1, alignItems: 'center', justifyContent: 'center', height: '100%', padding: "40px", width: "80%"
      }}>
        <Typography variant='h4' sx={{ fontWeight: 600, color: brandColors.yellow }}>Create a Presentation</Typography>
        <Typography variant='subtitle1' sx={{ color: 'white', textAlign: "center" }}>Use AI to create a presentation on any topic in English within 2 minutes</Typography>
        <Link href="/ai-presentations/create">
          <Button sx={ButtonStyle}>🚀 Create Presentation</Button>
        </Link>
      </Box>
    </Box>
  )
}

const ComponentWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
  width: "100%",
  minHeight: "320px",
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  borderBox: "box-sizing",

}


const ButtonStyle = {
  background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
  color: "white",
  mt: 2,
  maxWidth: 'max-content',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  paddingX: '16px',
  '&:disabled': {
    color: "#c4c2c2",
    background: brandColors.darkPurple,
  },
  '&:hover': {
    background: "#2d1571",
    cursor: "pointer",
  },
}