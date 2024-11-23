"use client"
import { useState } from 'react';
import { Box, } from '@mui/material';
import { SlideOne, SlideLast } from '../components/SlideContent';
import { usePresentationStore, useStoreUser } from '@/components/zustand';
import FullScreenSlideModal from '../components/FullScreenSlideModal';
import PresentationSlide from '../components/PresentationSlide';
import ApiServices from '@/api/ApiServices';
import ErrorPage from '@/errorpage';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '@/components/LoadingPage';


interface SlideType {
  title: string;
  subtitle: string;
  content: {
    [key: string]: string | string[];
  };
}


interface PresentationContent {
  topic: string;
  slides: SlideType[];
}


const Presentation = ({ params }: { params: { id: string } }) => {
  const { userInfo } = useStoreUser();
  const [fullscreenSlide, setFullscreenSlide] = useState<number | null>(null);
  const { presentation, setPresentation } = usePresentationStore()

  const { apiRequest } = ApiServices()
  const id = params.id
  const {
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`presentation-${id}`],
    queryFn: () => apiRequest("GET", null, { collectionName: "presentations", uid: id }),
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data?.data) {
        setPresentation(data?.data)
      }
    }
  })

  const presentationContent: PresentationContent = presentation?.content

  if (isLoading) return <LoadingPage />
  if (isError) return <ErrorPage />

  return (
    <Box id="presentation-container" sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 4, height: '100vh', overflowY: 'auto', backgroundColor: "#eeeeff", borderRadius: 2, mt: -1 }}>

      {/* Slide 1 */}
      <SlideOne title={presentationContent?.topic} setFullscreenSlide={setFullscreenSlide} fullscreenSlide={fullscreenSlide} path={["topic"]} />

      {/* Slides */}
      {presentationContent?.slides?.map((slide: any, index: number) => (
        <PresentationSlide key={index} path={["slides", index.toString()]} index={index + 1} setFullscreenSlide={setFullscreenSlide} slide={slide} userInfo={userInfo} fullscreenSlide={fullscreenSlide} />
      ))}

      {/* Slide Last */}
      <SlideLast setFullscreenSlide={setFullscreenSlide} fullscreenSlide={fullscreenSlide} />

      {/* Fullscreen Slide Modal */}
      <FullScreenSlideModal
        open={fullscreenSlide !== null}
        onClose={() => setFullscreenSlide(null)}
      >
        <Box sx={{
          width: '100vw',
          height: '100vh',
          padding: 4
        }}>
          {fullscreenSlide === 0 ? (
            <SlideOne path={["topic"]} totalSlidesCount={presentationContent?.slides?.length + 2} title={presentationContent?.topic} setFullscreenSlide={setFullscreenSlide} fullscreenSlide={fullscreenSlide} />
          ) : fullscreenSlide === presentationContent?.slides?.length + 1 ? (
            <SlideLast totalSlidesCount={presentationContent?.slides?.length + 2} setFullscreenSlide={setFullscreenSlide} fullscreenSlide={fullscreenSlide} />
          ) : (
            <PresentationSlide
              key={fullscreenSlide}
              index={fullscreenSlide || 0}
              setFullscreenSlide={setFullscreenSlide}
              fullscreenSlide={fullscreenSlide}
              slide={presentationContent?.slides?.[(fullscreenSlide || 1) - 1]}
              userInfo={userInfo}
            />
          )}
        </Box>
      </FullScreenSlideModal>
    </Box >
  )
}

export default Presentation;