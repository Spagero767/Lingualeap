'use client';

import {useState} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import {getExplanationAction} from './actions';
import {BotMessageSquare, Loader2} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

type UserLevel = 'beginner' | 'intermediate' | 'advanced';

export default function GrammarToolPage() {
  const [userInput, setUserInput] = useState('');
  const [userLevel, setUserLevel] = useState<UserLevel>('beginner');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setExplanation('');

    const result = await getExplanationAction({userInput, userLevel});

    if (result.success) {
      setExplanation(result.explanation);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <BotMessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Grammar AI</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Have a question about a sentence? Type it below and let our AI explain
        the grammar for you.
      </p>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Analyze a Sentence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="sentence">Sentence to analyze</Label>
              <Textarea
                id="sentence"
                placeholder="e.g., Me gustaría un café, por favor."
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="level">Your proficiency level</Label>
              <Select
                onValueChange={(value: UserLevel) => setUserLevel(value)}
                defaultValue={userLevel}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || !userInput}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Analyzing...' : 'Get Explanation'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {explanation && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Grammar Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap leading-relaxed">{explanation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
