import { Box, Card, CardContent } from "@mui/material";
import SlideHeader from "./SlideHeader";
import { isAdminOrTeacher } from "@/components/hooks/userRoles";
import { NavigationButtons } from '../components/NavigationButtons';
import { styled } from '@mui/system';
import { SlideContent } from "./SlideContent";
import presentationContent from '../utils/presentationContent.json';
import { SlideIconButtons } from "./SlideIconButtons";
import EditableText from "./EditableText";
import SlideImage from "./SlideImage";
import { PresentationPage } from "./PresentationReusables";


const SlideCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: "10px",
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  width: '100%',
  minHeight: "750px",
  height: 'fit-content',
  maxWidth: '1000px',
  background: 'white',
}));

type PresentationSlideProps = {
  path?: string[],
  index: number,
  setFullscreenSlide: (index: number) => void,
  slide: any,
  fullscreenSlide: number | null,
  userInfo: any
}


export default function PresentationSlide({ path = [], index, setFullscreenSlide, slide, fullscreenSlide, userInfo }: PresentationSlideProps): JSX.Element {

  const imageOne = "/ai-ppt-images/ai-ppt-lesson-goal.webp"
  const imageTwo = "/ai-ppt-images/ai-ppt-teacher-teaching.webp"

  return (
    <SlideCard sx={fullscreenSlide !== null ? { width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh' } : {}
    }>
      <SlideIconButtons fullscreenSlide={fullscreenSlide} index={index} setFullscreenSlide={setFullscreenSlide} />
      <CardContent sx={{
        display: 'flex',
        gap: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: '10px',
          flex: 2,
        }}>
          <SlideHeader title={slide.title} subtitle={slide.subtitle} path={path || []} />

          <Box sx={{
            display: 'flex',
            gap: 1,
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0px 20px 10px',
              gap: 1,
              flex: 2,
            }}>
              {slide.content?.text && slide.content?.text.map((paragraph: string, index: number) => (
                <EditableText text={paragraph} key={index} path={[...path, "content", "text", index.toString()]} />
              ))}

              {slide.content.lesson_goal && (
                <SlideContent title="Lesson Goal" content={slide.content.lesson_goal} path={[...path, "content", "lesson_goal"]} />
              )}

              {slide.content.focus_points && (
                <SlideContent title="Focus Points" content={slide.content.focus_points} isList path={[...path, "content", "focus_points"]} />
              )}

              {slide.content.vocabulary && (
                <SlideContent title="Vocabulary" content={slide.content.vocabulary} isList path={[...path, "content", "vocabulary"]} />
              )}

              {slide.content.examples && (
                <SlideContent title="Examples" content={slide.content.examples} isList path={[...path, "content", "examples"]} />
              )}

              {slide.content.formulation_rules && (
                <SlideContent title="Formulation Rules" content={slide.content.formulation_rules} isList path={[...path, "content", "formulation_rules"]} />
              )}

              {slide.content.use_cases && (
                <SlideContent title="Use Cases" content={slide.content.use_cases} isList path={[...path, "content", "use_cases"]} />
              )}

              {slide.content.instructions && (
                <SlideContent title="Instructions" content={slide.content.instructions} path={[...path, "content", "instructions"]} />
              )}

              {slide.content.example_sentences && (
                <SlideContent title="Example Sentences" content={slide.content.example_sentences} isList path={[...path, "content", "example_sentences"]} />
              )}

              {isAdminOrTeacher(userInfo) && slide.content.answers && (
                <SlideContent title="Answers" content={slide.content.answers} isList path={[...path, "content", "answers"]} />
              )}

              {isAdminOrTeacher(userInfo) && slide.content.for_teacher_transition && (
                <SlideContent title="Teacher Transition" content={slide.content.for_teacher_transition} path={[...path, "content", "for_teacher_transition"]} />
              )}

              {isAdminOrTeacher(userInfo) && slide.content.for_teacher_talk && (
                <SlideContent title="Teacher Talk" content={slide.content.for_teacher_talk} path={[...path, "content", "for_teacher_talk"]} />
              )}

              {isAdminOrTeacher(userInfo) && slide.content.for_teacher_practice_prompt && (
                <SlideContent title="Practice Prompt" content={slide.content.for_teacher_practice_prompt} path={[...path, "content", "for_teacher_practice_prompt"]} />
              )}

              {slide.content.for_teacher_mini_task && (
                <SlideContent title="Mini Task" content={slide.content.for_teacher_mini_task} path={[...path, "content", "for_teacher_mini_task"]} />
              )}

              {slide.content.for_teacher_pair_work && (
                <SlideContent title="Pair Work" content={slide.content.for_teacher_pair_work} path={[...path, "content", "for_teacher_pair_work"]} />
              )}

              {slide.content.challenge && (
                <SlideContent title="Challenge" content={slide.content.challenge} path={[...path, "content", "challenge"]} />
              )}

              {slide.content.structure_support && (
                <SlideContent title="Structure Support" content={slide.content.structure_support} path={[...path, "content", "structure_support"]} />
              )}

              {slide.content.partner_activity && (
                <SlideContent title="Partner Activity" content={slide.content.partner_activity} path={[...path, "content", "partner_activity"]} />
              )}

              {slide.content.summary && (
                <SlideContent title="Summary" content={slide.content.summary} isList path={[...path, "content", "summary"]} />
              )}

              {slide.content.review_questions && (
                <SlideContent title="Review Questions" content={slide.content.review_questions} isList path={[...path, "content", "review_questions"]} />
              )}

              {isAdminOrTeacher(userInfo) && slide.content.final_activity && (
                <SlideContent title="Final Activity" content={slide.content.final_activity} path={[...path, "content", "final_activity"]} />
              )}

              {isAdminOrTeacher(userInfo) && slide.content.for_teacher_closing && (
                <SlideContent title="Teacher Closing" content={slide.content.for_teacher_closing} onlyTeacher={true} path={[...path, "content", "for_teacher_closing"]} />
              )}
            </Box>
            {<SlideImage path={path ? [...path, "image"] : []} currentImage={index === 2 ? imageOne : index === 1 ? imageTwo : slide?.image} />}
          </Box>
        </Box>
        <PresentationPage display={fullscreenSlide === null} currentSlide={index} totalSlides={presentationContent?.slides?.length + 2} />
      </CardContent>


      <NavigationButtons
        currentSlide={index}
        totalSlides={presentationContent?.slides?.length + 2}
        display={fullscreenSlide !== null}
        setFullscreenSlide={setFullscreenSlide}
      />
    </SlideCard >
  );
}