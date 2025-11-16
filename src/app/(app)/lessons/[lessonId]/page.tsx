'use client';

import {useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {lessons, Exercise} from '@/lib/data';
import {Progress} from '@/components/ui/progress';
import {MultipleChoiceExercise} from '@/components/lessons/multiple-choice';
import {FillInTheBlankExercise} from '@/components/lessons/fill-in-the-blank';
import {PronunciationPractice} from '@/components/lessons/pronunciation-practice';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {PartyPopper} from 'lucide-react';
import {Button} from '@/components/ui/button';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.lessonId as string;
  const lesson = lessons.find(l => l.id === parseInt(lessonId));

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isLessonComplete, setIsLessonComplete] = useState(false);

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Lesson not found.
      </div>
    );
  }

  const handleNextExercise = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setIsLessonComplete(true);
    }
  };

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  const renderExercise = (exercise: Exercise) => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceExercise
            exercise={exercise}
            onContinue={handleNextExercise}
          />
        );
      case 'fill-in-the-blank':
        return (
          <FillInTheBlankExercise
            exercise={exercise}
            onContinue={handleNextExercise}
          />
        );
      case 'pronunciation':
        return (
          <PronunciationPractice
            exercise={exercise}
            onContinue={handleNextExercise}
          />
        );
      default:
        return null;
    }
  };

  if (isLessonComplete) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-8">
          <PartyPopper className="h-16 w-16 mx-auto text-yellow-500" />
          <h2 className="text-2xl font-bold mt-4">Lesson Complete!</h2>
          <p className="text-muted-foreground mt-2">
            You've earned {lesson.xp} XP.
          </p>
          <Button
            onClick={() => router.push('/lessons')}
            className="mt-6 w-full"
          >
            Back to Lessons
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <div className="mb-4 flex items-center gap-4">
          <Progress value={progress} className="flex-1" />
          <span className="text-sm font-semibold text-muted-foreground">
            {currentExerciseIndex + 1} / {lesson.exercises.length}
          </span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg md:text-xl font-normal">
              {currentExercise.prompt}
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[250px] flex items-center justify-center p-2 sm:p-6">
            {renderExercise(currentExercise)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
