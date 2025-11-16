import {generateExercisesToReview} from '@/ai/flows/exercise-review-presenter';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {lessons} from '@/lib/data';
import {Lightbulb, Repeat} from 'lucide-react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

async function getReviewExercises() {
  // Mock data for the AI flow
  const mockInput = {
    userId: 'user123',
    exercisesCompleted: ['101', '102', '103', '201'],
    userProficiencyLevels: {
      '101': 0.9,
      '102': 0.6,
      '103': 0.8,
      '201': 0.4,
    },
  };

  try {
    const result = await generateExercisesToReview(mockInput);
    const exerciseIdsToReview = result.exercisesToReview.map(id => parseInt(id));

    const allExercises = lessons.flatMap(lesson =>
      lesson.exercises.map(ex => ({...ex, lessonId: lesson.id}))
    );

    return allExercises.filter(ex => exerciseIdsToReview.includes(ex.id));
  } catch (error) {
    console.error('Failed to generate review exercises:', error);
    return [];
  }
}

export default async function ReviewPage() {
  const exercisesToReview = await getReviewExercises();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Repeat className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Review Session</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        AI has selected these exercises to help you strengthen your skills.
      </p>

      {exercisesToReview.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exercisesToReview.map(exercise => (
            <Card key={exercise.id}>
              <CardHeader>
                <CardTitle className="truncate">{exercise.prompt}</CardTitle>
                <CardDescription>
                  From lesson:{' '}
                  {lessons.find(l => l.id === (exercise as any).lessonId)?.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/lessons/${(exercise as any).lessonId}`}>
                  <Button className="w-full">Review Exercise</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <Lightbulb className="h-12 w-12 text-yellow-500 mb-4" />
          <CardTitle>All caught up!</CardTitle>
          <CardDescription className="mt-2">
            There are no exercises to review at the moment.
            <br />
            Keep learning new material!
          </CardDescription>
          <Link href="/lessons" className="mt-6">
            <Button>Go to Lessons</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
