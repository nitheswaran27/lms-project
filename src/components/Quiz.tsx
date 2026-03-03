import React, { useState } from "react";
import { Question } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      onComplete(Math.round((score / questions.length) * 100));
    }
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="text-center p-8 border-accent/20">
        <CardContent className="space-y-6 pt-6">
          <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
            <Award className="h-10 w-10 text-accent" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Quiz Completed!</h2>
            <p className="text-muted-foreground">You scored {score} out of {questions.length}</p>
          </div>
          <div className="text-5xl font-extrabold text-accent">{percentage}%</div>
          <p className="text-sm text-muted-foreground">
            {percentage >= 70 ? "Great job! You passed the assessment." : "Keep practicing and try again to improve your score."}
          </p>
          <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Course
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-border bg-card overflow-hidden">
      <CardHeader className="bg-muted/50 p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Question {currentIndex + 1} of {questions.length}</span>
          <div className="h-1.5 w-32 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300" 
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <CardTitle className="text-xl leading-relaxed font-display">{currentQuestion.question}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border text-left transition-all duration-200",
                selectedOption === index 
                  ? "border-accent bg-accent/5 ring-1 ring-accent" 
                  : "border-border hover:border-accent/50 hover:bg-accent/5",
                isAnswered && index === currentQuestion.correctIndex && "bg-green-500/10 border-green-500 ring-green-500",
                isAnswered && selectedOption === index && index !== currentQuestion.correctIndex && "bg-destructive/10 border-destructive ring-destructive"
              )}
            >
              <span className="text-sm font-medium">{option}</span>
              {isAnswered && index === currentQuestion.correctIndex && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              {isAnswered && selectedOption === index && index !== currentQuestion.correctIndex && <XCircle className="h-5 w-5 text-destructive" />}
            </button>
          ))}
        </div>

        <div className="pt-6 flex justify-end">
          {!isAnswered ? (
            <Button onClick={handleCheck} disabled={selectedOption === null} size="lg" className="w-full sm:w-auto">
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="w-full sm:w-auto">
              {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper for class joining (imported from utils)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default Quiz;
