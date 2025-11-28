import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  points: number;
}

interface QuizInterfaceProps {
  quizId: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore: number;
  onComplete: (score: number, passed: boolean) => void;
}

export const QuizInterface = ({
  title,
  description,
  questions,
  passingScore,
  onComplete,
}: QuizInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;

    questions.forEach((question) => {
      maxScore += question.points;
      if (selectedAnswers[question.id] === question.correct_answer) {
        totalScore += question.points;
      }
    });

    const percentage = (totalScore / maxScore) * 100;
    setScore(percentage);
    setShowResults(true);
    onComplete(percentage, percentage >= passingScore);
  };

  if (showResults) {
    const passed = score >= passingScore;
    
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {passed ? (
              <Trophy className="h-20 w-20 text-yellow-500" />
            ) : (
              <XCircle className="h-20 w-20 text-destructive" />
            )}
          </div>
          <CardTitle className="text-3xl">
            {passed ? "Congratulations!" : "Keep Learning"}
          </CardTitle>
          <CardDescription>
            {passed
              ? "You've passed the quiz!"
              : `You need ${passingScore}% to pass. Try again!`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{Math.round(score)}%</div>
            <Progress value={score} className="h-3" />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Review Your Answers</h3>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[question.id];
              const isCorrect = userAnswer === question.correct_answer;

              return (
                <Card key={question.id} className={isCorrect ? "border-green-500" : "border-destructive"}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1 space-y-2">
                        <p className="font-medium">
                          {index + 1}. {question.question}
                        </p>
                        <div className="text-sm space-y-1">
                          <p>
                            Your answer: <Badge variant={isCorrect ? "default" : "destructive"}>{userAnswer || "Not answered"}</Badge>
                          </p>
                          {!isCorrect && (
                            <p>
                              Correct answer: <Badge variant="default">{question.correct_answer}</Badge>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button onClick={() => window.location.reload()} className="w-full">
            {passed ? "Continue Learning" : "Retake Quiz"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <Badge variant="outline">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
          
          <RadioGroup
            value={selectedAnswers[currentQuestion.id] || ""}
            onValueChange={handleAnswerSelect}
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion.id]}
          >
            {currentQuestionIndex === questions.length - 1 ? "Submit Quiz" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};