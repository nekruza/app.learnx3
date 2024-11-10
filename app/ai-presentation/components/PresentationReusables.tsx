import { Box, Typography } from "@mui/material";
import { brandColors } from "@/components/utils/brandColors";
import dayjs from "dayjs";

export const PresentationDate = () => (
  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
    <Typography fontSize="0.9rem" color={brandColors.grey}>
      {dayjs().format('D MMM YYYY')}
    </Typography>
  </div>
);


export const PresentationPage = ({ display, currentSlide, totalSlides, style }: { display?: boolean, currentSlide: number, totalSlides: number, style?: React.CSSProperties }) => (
  <Box sx={{ flex: 1, display: display ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', maxHeight: "fit-content", mb: 0, ...style, }}>
    <Typography fontSize="1rem" margin="0px 10px" color={brandColors.grey}>{currentSlide + 1} / {totalSlides}</Typography>
  </Box>
);