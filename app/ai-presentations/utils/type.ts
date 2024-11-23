export interface SlideContent {
  text?: string[];
  for_teacher_transition?: string;
  lesson_goal?: string;
  focus_points?: string[];
  for_teacher_talk?: string;
  vocabulary?: string[];
  examples?: string[];
  formulation_rules?: string[];
  use_cases?: string[];
  for_teacher_practice_prompt?: string;
  for_teacher_mini_task?: string;
  instructions?: string;
  example_sentences?: string[];
  answers?: string[];
  for_teacher_pair_work?: string;
  challenge?: string;
  structure_support?: string;
  partner_activity?: string;
  summary?: string[];
  review_questions?: string[];
  final_activity?: string;
  for_teacher_closing?: string;
}

export interface Slide {
  title: string;
  subtitle: string;
  content: SlideContent;
  image: string;
}

export interface Content {
  topic: string;
  content: Slide[];
}

export interface PresentationContent {
  content: Content;
  createdAt: string;
  createdById: string;
  createdByName: string;
  uid: string;
}