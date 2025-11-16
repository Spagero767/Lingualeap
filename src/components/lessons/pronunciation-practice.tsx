'use client';

import {useState, useEffect} from 'react';
import {PronunciationExerciseData} from '@/lib/data';
import {Button} from '@/components/ui/button';
import {Alert, AlertTitle, AlertDescription} from '@/components/ui/alert';
import {CheckCircle2, Mic, Volume2, XCircle} from 'lucide-react';
import {cn} from '@/lib/utils';

interface Props {
  exercise: PronunciationExerciseData;
  onContinue: () => void;
}

export function PronunciationPractice({exercise, onContinue}: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // Placeholder for voice recognition logic
    if (isRecording) {
      const timer = setTimeout(() => {
        setIsRecording(false);
        setIsAnswered(true);
        // Simulate AI feedback
        setIsCorrect(Math.random() > 0.4);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isRecording]);

  const handleRecord = () => {
    setIsRecording(true);
  };

  const handlePlayExample = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(exercise.correctAnswer);
      utterance.lang = 'es-ES'; // Example, should be dynamic
      speechSynthesis.speak(utterance);
    }
  };

  const handleSkip = () => {
    setIsAnswered(true);
    setIsCorrect(true); // Assume correct if skipped
    setTimeout(onContinue, 1000); // Give user time to see they skipped
  };

  return (
    <div className="w-full max-w-md space-y-6 text-center">
      <div className="flex items-center justify-center gap-4">
        <h2 className="text-3xl font-bold font-headline">
          {exercise.correctAnswer}
        </h2>
        <Button size="icon" variant="ghost" onClick={handlePlayExample}>
          <Volume2 className="h-6 w-6" />
          <span className="sr-only">Listen</span>
        </Button>
      </div>

      <Button
        size="lg"
        className={cn(
          'rounded-full h-20 w-20 shadow-lg',
          isRecording && 'bg-red-500 hover:bg-red-600 animate-pulse'
        )}
        onClick={handleRecord}
        disabled={isRecording || isAnswered}
      >
        <Mic className="h-8 w-8" />
        <span className="sr-only">Record pronunciation</span>
      </Button>
      <p className="text-muted-foreground">
        {isRecording ? 'Listening...' : 'Tap to speak'}
      </p>

      {isAnswered ? (
        <div className="space-y-4">
          {isCorrect !== null && (
            <Alert
              variant={isCorrect ? 'default' : 'destructive'}
              className={
                isCorrect
                  ? 'border-green-500 text-green-700 [&>svg]:text-green-500'
                  : 'border-red-500'
              }
            >
              {isCorrect ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {isCorrect ? "Sounds great!" : "Let's try that again"}
              </AlertTitle>
              <AlertDescription>
                {isCorrect
                  ? exercise.feedback.correct
                  : exercise.feedback.incorrect}
              </AlertDescription>
            </Alert>
          )}
          <Button onClick={onContinue} className="w-full">
            Continue
          </Button>
        </div>
      ) : (
        <Button onClick={handleSkip} variant="link">
          Can't speak now? Skip
        </Button>
      )}
    </div>
  );
}
