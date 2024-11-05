"use client"
import { brandColors } from "@/components/utils/brandColors";
import { Box, Card, List, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import HoverAudioTranslator from "./HoverTranslator";


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
  alignItems: 'center',
  borderRadius: '10px',
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

export const Slide = ({ title, content, isList = false, image = false }: { title: string, content: string | string[], isList?: boolean, image?: boolean }) => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}>
      <SectionTitle
        variant="h6"
        sx={{
          color: '#9F7AEA',
          borderLeft: '3px solid #9F7AEA',
          paddingLeft: 2,
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
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {(content as string[]).map((item: string, index: number) => (
              <HoverAudioTranslator text={item} key={index}>
                <Typography paragraph sx={{ padding: "2px 10px", background: "#f1f5f9", borderRadius: "4px", margin: "4px", position: "relative" }}>{item}</Typography>
              </HoverAudioTranslator>
            ))}
          </Box>
        </List>
      ) : (
        <Typography paragraph>{content}</Typography>
      )}
    </Box>
  );
};



export const SlideOne = ({ title, content }: { title: string, content: string }) => (
  <BaseCard>
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
  </BaseCard>
);

export const SlideLast = () => (
  <BaseCard>
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
  </BaseCard>
);