export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  videoUrl: string;
  videoDuration: number;
  thumbnail: string;
  category: string;
  questions: Question[];
}
