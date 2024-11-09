import { brandColors } from "@/components/utils/brandColors";
import { Box, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";

export const NavigationButtons = ({ currentSlide, totalSlides, setFullscreenSlide }: {
  currentSlide: number,
  totalSlides: number,
  setFullscreenSlide: (index: number) => void
}) => (
  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', position: 'absolute', bottom: 20, gap: 2, padding: '0px 40px' }}>
    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
      <Typography fontSize="0.9rem" color={brandColors.grey}>
        {dayjs().format('D MMM YYYY')}
      </Typography>
    </div>
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <Typography fontSize="1rem" margin="0px 10px" color={brandColors.grey}>{currentSlide + 1}</Typography>
    </Box>
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