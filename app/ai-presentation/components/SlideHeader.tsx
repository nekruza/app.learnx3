import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/system';
import EditableText from './EditableText';
import { useSearchParams } from 'next/navigation';

interface SlideHeaderProps {
  title: string;
  subtitle: string;
  path: string[];
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

const SlideHeader: React.FC<SlideHeaderProps> = ({ title, subtitle, path }) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  return (
    <StyledBox>
      <StyledTypography variant="h5">
        <EditableText text={title} path={path ? [...path, "title"] : ["title"]} textStyle={{ fontSize: "1.7rem", fontWeight: 600 }} />
      </StyledTypography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        <EditableText text={subtitle} path={path ? [...path, "subtitle"] : ["subtitle"]} textStyle={{ fontSize: "1.1rem" }} />
      </Typography>
      <Divider sx={{ marginY: 1 }} />
    </StyledBox>
  );
};

export default SlideHeader; 