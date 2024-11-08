"use client"
import { Box, Card, CardContent, Typography, } from '@mui/material';
import { styled } from '@mui/system';
import { Slide, SlideOne, SlideLast } from '../components/Slide';
import { usePresentationStore, useStoreUser } from '@/components/zustand';
import presentationContent from '../utils/presentationContent.json';
import { isAdminOrTeacher } from '@/components/hooks/userRoles';
import SlideHeader from '../components/SlideHeader';


const SlideCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: "10px",
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  minHeight: '500px',
  maxHeight: '700px',
  maxWidth: '1000px',
  background: 'white',
}));



const Presentation = () => {
  const { presentation } = usePresentationStore();
  const { userInfo } = useStoreUser();

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 4, height: '100vh', overflowY: 'auto', backgroundColor: "#eeeeff", borderRadius: 2, mt: -1 }}>

      <SlideOne title={presentationContent?.topic} content={"this is the introduction"} />

      {presentationContent?.slides?.map((slide: any, index: number) => (
        <Box key={index} sx={{ marginBottom: 2, maxHeight: '700px', width: '100%' }}>
          <SlideCard>
            <CardContent sx={{
              display: 'flex',
              gap: 1,
              height: '100%',
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                padding: '10px',
              }}>
                <SlideHeader title={slide.title} subtitle={slide.subtitle} />

                <Box sx={{
                  display: 'flex',
                  gap: 1,
                }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0px 20px 10px',
                    gap: 1,
                  }}>
                    {slide.content.text && slide.content.text.map((paragraph: string, index: number) => (
                      <Typography key={index} paragraph>
                        {paragraph}
                      </Typography>
                    ))}

                    {slide.content.lesson_goal && (
                      <Slide title="Lesson Goal" content={slide.content.lesson_goal} />
                    )}

                    {slide.content.focus_points && (
                      <Slide title="Focus Points" content={slide.content.focus_points} isList />
                    )}

                    {slide.content.vocabulary && (
                      <Slide title="Vocabulary" content={slide.content.vocabulary} isList />
                    )}

                    {slide.content.examples && (
                      <Slide title="Examples" content={slide.content.examples} isList />
                    )}

                    {slide.content.formulation_rules && (
                      <Slide title="Formulation Rules" content={slide.content.formulation_rules} isList />
                    )}

                    {slide.content.use_cases && (
                      <Slide title="Use Cases" content={slide.content.use_cases} isList />
                    )}

                    {slide.content.instructions && (
                      <Slide title="Instructions" content={slide.content.instructions} />
                    )}

                    {slide.content.example_sentences && (
                      <Slide title="Example Sentences" content={slide.content.example_sentences} isList />
                    )}

                    {slide.content.answers && (
                      <Slide title="Answers" content={slide.content.answers} isList />
                    )}

                    {slide.content.for_teacher_transition && (
                      <Slide title="Teacher Transition" content={slide.content.for_teacher_transition} />
                    )}

                    {slide.content.for_teacher_talk && (
                      <Slide title="Teacher Talk" content={slide.content.for_teacher_talk} />
                    )}

                    {slide.content.for_teacher_practice_prompt && (
                      <Slide title="Practice Prompt" content={slide.content.for_teacher_practice_prompt} />
                    )}

                    {slide.content.for_teacher_mini_task && (
                      <Slide title="Mini Task" content={slide.content.for_teacher_mini_task} />
                    )}

                    {slide.content.for_teacher_pair_work && (
                      <Slide title="Pair Work" content={slide.content.for_teacher_pair_work} />
                    )}

                    {slide.content.challenge && (
                      <Slide title="Challenge" content={slide.content.challenge} />
                    )}

                    {slide.content.structure_support && (
                      <Slide title="Structure Support" content={slide.content.structure_support} />
                    )}

                    {slide.content.partner_activity && (
                      <Slide title="Partner Activity" content={slide.content.partner_activity} />
                    )}

                    {slide.content.summary && (
                      <Slide title="Summary" content={slide.content.summary} isList />
                    )}

                    {slide.content.review_questions && (
                      <Slide title="Review Questions" content={slide.content.review_questions} isList />
                    )}

                    {slide.content.final_activity && (
                      <Slide title="Final Activity" content={slide.content.final_activity} />
                    )}

                    {isAdminOrTeacher(userInfo) && slide.content.for_teacher_closing && (
                      <Slide title="Teacher Closing" content={slide.content.for_teacher_closing} onlyTeacher={true} />
                    )}
                  </Box>
                  {index === 1 && <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    maxHeight: '500px',
                    overflow: 'hidden',
                    marginRight: '10px',
                    mt: 4,
                  }}>
                    <img style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: '6px',
                    }} src="/ai-ppt-images/ai-ppt-lesson-goal.webp" alt="ai-ppt-1" />
                  </Box>}
                </Box>
              </Box>



              {index === 0 && <img style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '400px',
                background: "red",
                backgroundImage: 'url(/ai-ppt-images/ai-ppt-teacher-teaching.webp)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                margin: '10px',
                borderRadius: '6px',
                marginRight: '10px',
              }} />}

            </CardContent>
            <Typography
              variant="body2"
              sx={{
                position: 'absolute',
                bottom: '10px',
                right: '20px',
                color: 'rgba(0, 0, 0, 0.6)',
                fontWeight: 500
              }}
            >
              {index + 1}
            </Typography>
          </SlideCard>
        </Box>
      ))}
      <SlideLast />
    </Box >
  )
}

export default Presentation;