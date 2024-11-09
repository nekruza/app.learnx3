"use client"
import { useState } from 'react';
import { Box, } from '@mui/material';
import { SlideOne, SlideLast } from '../components/SlideContent';
import { usePresentationStore, useStoreUser } from '@/components/zustand';
import presentationContent from '../utils/presentationContent.json';
import FullScreenSlideModal from '../components/FullScreenSlideModal';
import PresentationSlide from '../components/PresentationSlide';


const Presentation = () => {
  const { presentation } = usePresentationStore();
  const { userInfo } = useStoreUser();
  const [fullscreenSlide, setFullscreenSlide] = useState<number | null>(null);

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 4, height: '100vh', overflowY: 'auto', backgroundColor: "#eeeeff", borderRadius: 2, mt: -1 }}>

      {/* Slide 1 */}
      <SlideOne title={presentationContent?.topic} content={"this is the introduction"} setFullscreenSlide={setFullscreenSlide} fullscreenSlide={fullscreenSlide} />

      {/* Slides */}
      {presentationContent?.slides?.map((slide: any, index: number) => (
        <PresentationSlide key={index} index={index + 1} setFullscreenSlide={setFullscreenSlide} slide={slide} userInfo={userInfo} fullscreenSlide={fullscreenSlide} />
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
            <SlideOne totalSlidesCount={presentationContent?.slides?.length + 2} title={presentationContent?.topic} content={"this is the introduction"} setFullscreenSlide={setFullscreenSlide} fullscreenSlide={fullscreenSlide} />
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