import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/system';

interface SlideHeaderProps {
  title: string;
  subtitle: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 20px 0px',
  gap: theme.spacing(1),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#9F7AEA',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    width: '24px',
    height: '24px',
    backgroundColor: '#9F7AEA',
    borderRadius: '50%',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const SlideHeader: React.FC<SlideHeaderProps> = ({ title, subtitle }) => {
  return (
    <StyledBox>
      <StyledTypography variant="h5">
        {title}
      </StyledTypography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {subtitle}
      </Typography>
      <Divider sx={{ marginY: 1 }} />
    </StyledBox>
  );
};

export default SlideHeader; 