import { Typography, Box } from "@mui/material";

const DividerWithText = ({ text, style }: { text: string, style?: React.CSSProperties }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ...style }}>
    <Box sx={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
    <Typography sx={{ color: '#718096', fontSize: '0.875rem' }}>{text}</Typography>
    <Box sx={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
  </Box>
);

export default DividerWithText;