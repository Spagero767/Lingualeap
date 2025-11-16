'use client';

import {useState} from 'react';
import {MultipleChoiceExerciseData} from '@/lib/data';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import Image from 'next/image';
import {Alert, AlertTitle, AlertDescription} from '@/components/ui/alert';
import {CheckCircle2, XCircle} from 'lucide-react';

interface Props {
  exercise: MultipleChoiceExerciseData;
  onContinue: () => void;
}

export function MultipleChoiceExercise({exercise, onContinue}: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const isCorrect = selectedOption === exercise.correctAnswer;

  const handleCheck = () => {
    if (selectedOption) {
      setIsAnswered(true);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {exercise.image && (
        <div className="relative aspect-video">
          <Image
            src={exercise.image}
            alt={exercise.prompt}
            fill
            className="rounded-lg object-cover"
            data-ai-hint="language lesson"
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercise.options.map(option => (
          <button
            key={option}
            disabled={isAnswered}
            onClick={() => setSelectedOption(option)}
            className={cn(
              'flex items-center justify-center text-center rounded-lg border-2 p-4 cursor-pointer transition-colors h-24 font-semibold text-lg',
              'hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-70',
              selectedOption === option && 'border-primary',
              isAnswered &&
                option === exercise.correctAnswer &&
                'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
              isAnswered &&
                selectedOption === option &&
                !isCorrect &&
                'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            )}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered ? (
        <div className="space-y-4">
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
            <AlertTitle>{isCorrect ? 'Excellent!' : 'Not quite'}</AlertTitle>
            <AlertDescription>
              {isCorrect
                ? exercise.feedback.correct
                : exercise.feedback.incorrect}
            </AlertDescription>
          </Alert>
          <Button
            onClick={onContinue}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Continue
          </Button>
        </div>
      ) : (
        <Button onClick={handleCheck} disabled={!selectedOption} className="w-full">
          Check
        </Button>
      )}
    </div>
  );
}
