'use client';

import {useState, useMemo} from 'react';
import {FillInTheBlankExerciseData} from '@/lib/data';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Alert, AlertTitle, AlertDescription} from '@/components/ui/alert';
import {CheckCircle2, XCircle} from 'lucide-react';

interface Props {
  exercise: FillInTheBlankExerciseData;
  onContinue: () => void;
}

export function FillInTheBlankExercise({exercise, onContinue}: Props) {
  const [blanks, setBlanks] = useState<Record<number, string>>({});
  const [isAnswered, setIsAnswered] = useState(false);

  const constructedAnswer = useMemo(() => {
    return exercise.parts
      .map(p => (p.type === 'text' ? p.text : blanks[p.id] || ''))
      .join('');
  }, [blanks, exercise.parts]);

  const isCorrect =
    constructedAnswer.trim().toLowerCase() ===
    exercise.correctAnswer.trim().toLowerCase();

  const handleCheck = () => {
    setIsAnswered(true);
  };

  const allBlanksFilled = useMemo(() => {
    const blankIds = exercise.parts.filter(p => p.type === 'blank').map(p => p.id);
    return blankIds.every(id => blanks[id] && blanks[id].trim() !== '');
  }, [blanks, exercise.parts]);

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xl md:text-2xl text-center bg-secondary/50 p-4 rounded-lg">
        {exercise.parts.map(part =>
          part.type === 'text' ? (
            <span key={part.id}>{part.text}</span>
          ) : (
            <Input
              key={part.id}
              style={{width: `${part.width || 8}ch`}}
              className="inline-block h-10 p-1 text-center text-xl md:text-2xl font-semibold bg-background"
              value={blanks[part.id] || ''}
              onChange={e =>
                setBlanks(prev => ({...prev, [part.id]: e.target.value}))
              }
              disabled={isAnswered}
            />
          )
        )}
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
            <AlertTitle>{isCorrect ? 'Well done!' : 'Keep trying!'}</AlertTitle>
            <AlertDescription>
              {isCorrect
                ? exercise.feedback.correct
                : `${exercise.feedback.incorrect} Correct answer: ${exercise.correctAnswer}`}
            </AlertDescription>
          </Alert>
          <Button onClick={onContinue} className="w-full">
            Continue
          </Button>
        </div>
      ) : (
        <Button onClick={handleCheck} disabled={!allBlanksFilled} className="w-full">
          Check
        </Button>
      )}
    </div>
  );
}
