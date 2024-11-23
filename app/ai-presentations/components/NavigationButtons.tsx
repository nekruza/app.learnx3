import { Box, IconButton } from "@mui/material";
import { PresentationDate, PresentationPage } from "./PresentationReusables";

export const NavigationButtons = ({ display, currentSlide, totalSlides, setFullscreenSlide }: {
  display: boolean,
  currentSlide: number,
  totalSlides: number,
  setFullscreenSlide: (index: number) => void
}) => (
  <Box sx={{ width: '100%', display: display ? 'flex' : "none", alignItems: 'center', position: 'absolute', bottom: 20, gap: 2, padding: '0px 40px' }}>
    <PresentationDate />
    <PresentationPage display={display} currentSlide={currentSlide} totalSlides={totalSlides} />
    <Box sx={{ flex: 1, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
      {currentSlide > 0 && (
        <IconButton
          sx={{
            borderRadius: 1,
            fontWeight: 600,
            fontSize: "1.2rem",
            color: "white",
            background: "rgba(147, 112, 219, 0.2)",
            padding: "8px 16px"
          }}
          onClick={() => setFullscreenSlide(currentSlide - 1)}
        >
          Prev
        </IconButton>
      )}
      {currentSlide < totalSlides - 1 && (
        <IconButton
          sx={{
            borderRadius: 1,
            fontWeight: 600,
            fontSize: "1.2rem",
            color: "white",
            background: "rgba(147, 112, 219, 0.2)",
            padding: "8px 16px"
          }}
          onClick={() => setFullscreenSlide(currentSlide + 1)}
        >
          Next
        </IconButton>
      )}
    </Box>
  </Box >
);