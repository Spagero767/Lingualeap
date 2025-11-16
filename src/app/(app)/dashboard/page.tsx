import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Progress} from '@/components/ui/progress';
import {Button} from '@/components/ui/button';
import {ArrowRight, Flame, Target, BookOpenCheck} from 'lucide-react';
import Link from 'next/link';
import {DailyProgressChart} from '@/components/dashboard/daily-progress-chart';
import placeholderData from '@/lib/placeholder-images.json';

const {placeholderImages} = placeholderData;

const leaderboard = [
  {
    rank: 1,
    name: 'Maria',
    xp: 1250,
    avatar: placeholderImages.find(p => p.id === 'avatar1')?.imageUrl,
  },
  {
    rank: 2,
    name: 'Alex',
    xp: 1100,
    avatar: placeholderImages.find(p => p.id === 'avatar2')?.imageUrl,
  },
  {
    rank: 3,
    name: 'You',
    xp: 1050,
    avatar: placeholderImages.find(p => p.id === 'avatar-you')?.imageUrl,
  },
  {
    rank: 4,
    name: 'Kenji',
    xp: 980,
    avatar: placeholderImages.find(p => p.id === 'avatar3')?.imageUrl,
  },
  {
    rank: 5,
    name: 'Sofia',
    xp: 950,
    avatar: placeholderImages.find(p => p.id === 'avatar4')?.imageUrl,
  },
];

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 / 20 XP</div>
            <p className="text-xs text-muted-foreground">You're almost there!</p>
            <Progress value={75} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Keep the flame alive!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lessons Completed
            </CardTitle>
            <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">2 this week</p>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-1 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Start your next lesson</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Continue your journey with Unit 2: Family & Friends.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/lessons/2">
              <Button variant="secondary" className="w-full">
                Let's Go <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DailyProgressChart />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>
              Your weekly ranking among other learners.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {leaderboard.map(user => (
                <li
                  key={user.rank}
                  className={`flex items-center p-2 rounded-lg ${
                    user.name === 'You' ? 'bg-accent/20' : ''
                  }`}
                >
                  <div className="font-bold text-lg w-8">{user.rank}</div>
                  <Avatar className="h-10 w-10 mx-4">
                    <AvatarImage
                      src={user.avatar}
                      data-ai-hint="person avatar"
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{user.xp} XP</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
