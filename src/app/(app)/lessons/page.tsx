import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ArrowRight, CheckCircle2} from 'lucide-react';
import Link from 'next/link';
import {lessons} from '@/lib/data';

export default function LessonsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Your Learning Path</h1>
      <div className="space-y-8">
        {lessons.map(lesson => (
          <Card key={lesson.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                    {lesson.completed && (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex flex-col">
                      <span className="font-bold">
                        {lesson.exercises.length}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Exercises
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">{lesson.xp}</span>
                      <span className="text-sm text-muted-foreground">XP</span>
                    </div>
                  </div>
                  <Link href={`/lessons/${lesson.id}`} className="mt-4 inline-block">
                    <Button variant={lesson.completed ? 'outline' : 'default'}>
                      {lesson.completed ? 'Review Lesson' : 'Start Lesson'}{' '}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
