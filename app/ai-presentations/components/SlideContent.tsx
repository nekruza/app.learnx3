"use client"
import { brandColors } from "@/components/utils/brandColors";
import { Box, Card, List, Typography, TextField } from "@mui/material";
import { styled } from "@mui/system";
import HoverAudioTranslator from "./HoverTranslator";
import { NavigationButtons } from "./NavigationButtons";
import EditableText from "./EditableText";
import { useSearchParams } from "next/dist/client/components/navigation";
import { SlideIconButtons } from "./SlideIconButtons";
import { useStoreUser } from "@/components/zustand";
import SlideImage from "./SlideImage";

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: "4px",
  marginBottom: "4px",
  fontWeight: 600,
}));



const ClassSignature = () => (
  <Typography variant="h6" paragraph color="white">Teacher {useStoreUser()?.userInfo?.name || "Anonymous"}'s class</Typography>
);

export const SlideContent = ({ title, content, isList = false, onlyTeacher = false, path = [] }: { title: string, content: string | string[], isList?: boolean, image?: boolean, onlyTeacher?: boolean, path?: string[] }) => {
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
        {title}
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
            {(Array.isArray(content) ? content : []).map((item: string, index: number) => (
              <HoverAudioTranslator text={item} key={index}>
                {isEditing ? (
                  <EditableText text={item} path={path ? [...path, index.toString()] : [index.toString()]} />
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
        <EditableText path={path || []} text={content as string} textStyle={onlyTeacher && { fontSize: "0.9rem", mb: 0 }} />
      )}
    </Box>
  );
};



export const SlideOne = ({ title, setFullscreenSlide, fullscreenSlide, totalSlidesCount, path }: {
  title: string,
  setFullscreenSlide: (index: number) => void,
  fullscreenSlide: number | null,
  totalSlidesCount?: number,
  path: string[],
}) => {
  return (
    <Card className="slide" sx={fullscreenSlide !== null ? { ...CardStyle, width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh' } : { ...CardStyle }}>
      <SlideIconButtons fullscreenSlide={fullscreenSlide} index={0} setFullscreenSlide={setFullscreenSlide} />
      <Box sx={{ ...BaseBoxStyle, justifyContent: 'space-between' }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
          padding: 8,
          flex: 2,
        }}>
          <Typography variant="h4" fontWeight={600} color="white">Topic</Typography>
          <EditableText text={title} path={path} textStyle={{ fontWeight: 600, color: brandColors.yellow, fontSize: "4rem", lineHeight: "1.2" }} />
          <ClassSignature />
        </Box>
        <SlideImage currentImage={"/ai-ppt-images/ai-ppt-page-1.png"} />
      </Box>

      <NavigationButtons
        currentSlide={0}
        display={fullscreenSlide !== null}
        totalSlides={totalSlidesCount || 0}
        setFullscreenSlide={setFullscreenSlide}
      />
    </Card>
  );
}

export const SlideLast = ({ setFullscreenSlide, fullscreenSlide, totalSlidesCount }: {
  setFullscreenSlide: (index: number) => void,
  fullscreenSlide: number | null,
  totalSlidesCount?: number,
}) => (
  <Card className="slide" sx={fullscreenSlide !== null ? { ...CardStyle, width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh' } : { ...CardStyle }}>
    <SlideIconButtons fullscreenSlide={fullscreenSlide} index={totalSlidesCount || 0} setFullscreenSlide={setFullscreenSlide} />
    <Box sx={{ ...BaseBoxStyle, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, maxHeight: "500px", }}>
      <Typography sx={{ fontSize: "4rem" }}>
        🎊
      </Typography>
      <Typography sx={{ fontSize: "4rem", fontWeight: 600, color: "#e5c643", mb: 2 }}>Thank you!</Typography>
      <ClassSignature />
    </Box>
    <NavigationButtons
      display={fullscreenSlide !== null}
      currentSlide={(totalSlidesCount || 1) - 1}
      totalSlides={(totalSlidesCount || 1)}
      setFullscreenSlide={setFullscreenSlide}
    />
  </Card >
);


const CardStyle = {
  backgroundImage: 'url(/ai-ppt-images/ai-ppt-bg.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100%',
  minHeight: "600px",
  maxHeight: "700px",
  maxWidth: '1000px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '10px',
  position: 'relative',
}


const BaseBoxStyle = {
  padding: 4,
  background: "#432b85",
  width: '90%',
  height: '80%',
  display: 'flex',
  margin: 'auto',
}