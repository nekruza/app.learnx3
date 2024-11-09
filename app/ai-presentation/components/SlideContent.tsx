"use client"
import { brandColors } from "@/components/utils/brandColors";
import { Box, Card, List, Typography, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import HoverAudioTranslator from "./HoverTranslator";
import { NavigationButtons } from "./NavigationButtons";
import { useState } from 'react';
import EditableText from "./EditableText";
import { useSearchParams } from "next/dist/client/components/navigation";
import { SlideIconButtons } from "./SlideIconButtons";

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: "4px",
  marginBottom: "4px",
  fontWeight: 600,
}));


const BaseCard = styled(Card)({
  marginTop: 2,
  marginBottom: 30,
  backgroundImage: 'url(/ai-ppt-images/ai-ppt-bg.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100%',
  minHeight: "500px",
  maxHeight: "600px",
  maxWidth: '1000px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '10px',
  position: 'relative',
});

const BaseBox = styled(Box)({
  padding: 4,
  background: "#432b85",
  width: '90%',
  height: '80%',
  display: 'flex',
});

const ClassSignature = () => (
  <Typography variant="h6" paragraph color="white">Teacher Hope's class</Typography>
);

export const SlideContent = ({ title, content, isList = false, image = false, onlyTeacher = false }: { title: string, content: string | string[], isList?: boolean, image?: boolean, onlyTeacher?: boolean }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflow: "auto",
      ...(onlyTeacher && { padding: "10px 20px", background: "#ffe5a3e3", borderRadius: "8px" }),
      position: 'relative'
    }}>
      <SectionTitle
        variant={"h6"}
        sx={{
          color: '#9F7AEA',
          borderLeft: '3px solid #9F7AEA',
          paddingLeft: 2,
          ...(onlyTeacher && { fontSize: "1rem" })
        }}
      >
        <EditableText text={editedTitle} />
      </SectionTitle>

      {isList ? (
        <List sx={{
          '& .MuiListItemText-primary': {
            color: 'black',
            '&::before': {
              content: '"•"',
              color: '#9F7AEA',
              marginRight: '8px',
            }
          }
        }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'start' }}>
            {(Array.isArray(editedContent) ? editedContent : []).map((item: string, index: number) => (
              <HoverAudioTranslator text={item} key={index}>
                {isEditing ? (
                  <TextField
                    value={item}
                    onChange={(e) => {
                      const newContent = [...(editedContent as string[])];
                      newContent[index] = e.target.value;
                      setEditedContent(newContent);
                    }}
                    size="small"
                    sx={{ minWidth: "fit-content", width: 'max-content' }}
                  />
                ) : (
                  <Typography paragraph sx={{
                    padding: "2px 10px",
                    background: "#f1f5f9",
                    borderRadius: "4px",
                    margin: "4px",
                    position: "relative"
                  }}>
                    {item}
                  </Typography>
                )}
              </HoverAudioTranslator>
            ))}
          </Box>
        </List>
      ) : (
        <EditableText text={editedContent as string} textStyle={onlyTeacher && { fontSize: "0.9rem", mb: 0 }} />
      )}
    </Box>
  );
};



export const SlideOne = ({ title, content, setFullscreenSlide, fullscreenSlide, totalSlidesCount }: {
  title: string,
  content: string,
  setFullscreenSlide: (index: number) => void,
  fullscreenSlide: number | null,
  totalSlidesCount?: number
}) => (
  <BaseCard sx={fullscreenSlide !== null ? { width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh' } : {}}>
    <SlideIconButtons fullscreenSlide={fullscreenSlide} index={0} setFullscreenSlide={setFullscreenSlide} />
    <BaseBox sx={{ justifyContent: 'space-between' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        gap: 1,
        padding: 4,
        mb: 4
      }}>
        <Typography variant="h4" fontWeight={600} color="white">Topic</Typography>
        <Typography variant="h2" fontWeight={600} color={brandColors.yellow}>{title}</Typography>
        <ClassSignature />
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}>
        <Image src="/ai-ppt-images/ai-ppt-page-1.png" alt="ai-ppt-1" width={400} height={350} />
      </Box>
    </BaseBox>
    {fullscreenSlide !== null && (
      <NavigationButtons
        currentSlide={0}
        totalSlides={totalSlidesCount || 0}
        setFullscreenSlide={setFullscreenSlide}
      />
    )}
  </BaseCard>
);

export const SlideLast = ({ setFullscreenSlide, fullscreenSlide, totalSlidesCount }: {
  setFullscreenSlide: (index: number) => void,
  fullscreenSlide: number | null,
  totalSlidesCount?: number
}) => (
  <BaseCard sx={fullscreenSlide !== null ? { width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh' } : {}}>
    <SlideIconButtons fullscreenSlide={fullscreenSlide} index={totalSlidesCount || 0} setFullscreenSlide={setFullscreenSlide} />
    <BaseBox sx={{
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
    }}>
      <Typography sx={{ fontSize: '4rem' }}>
        🎊
      </Typography>
      <Typography variant="h2" fontWeight={600} color="#e5c643" mb={2}>Thank you!</Typography>
      <ClassSignature />
    </BaseBox>
    {fullscreenSlide !== null && (
      <NavigationButtons
        currentSlide={(totalSlidesCount || 1) - 1}
        totalSlides={(totalSlidesCount || 1) - 1}
        setFullscreenSlide={setFullscreenSlide}
      />
    )}
  </BaseCard>
);