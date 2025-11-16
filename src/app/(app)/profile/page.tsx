import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Medal, ShieldCheck, Zap} from 'lucide-react';
import placeholderData from '@/lib/placeholder-images.json';

const {placeholderImages} = placeholderData;

const user = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  joinDate: '2023-05-15',
  avatar: placeholderImages.find(p => p.id === 'avatar-you')?.imageUrl,
};

const stats = {
  totalXp: 1050,
  streak: 12,
  lessonsCompleted: 34,
};

const achievements = [
  {
    id: 1,
    name: 'Fast Learner',
    icon: Zap,
    description: 'Complete a lesson in under 5 minutes',
  },
  {
    id: 2,
    name: 'Perfect Score',
    icon: ShieldCheck,
    description: 'Get 100% on a lesson',
  },
  {
    id: 3,
    name: 'Week Streak',
    icon: Medal,
    description: 'Maintain a 7-day streak',
  },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
            <AvatarImage src={user.avatar} data-ai-hint="person avatar" />
            <AvatarFallback className="text-3xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{user.name}</CardTitle>
          <CardDescription>
            Member since {new Date(user.joinDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card>
              <CardHeader>
                <CardTitle>{stats.totalXp}</CardTitle>
                <CardDescription>Total XP</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{stats.streak} days</CardTitle>
                <CardDescription>Current Streak</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{stats.lessonsCompleted}</CardTitle>
                <CardDescription>Lessons Completed</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map(ach => (
                <div
                  key={ach.id}
                  className="flex items-center gap-4 p-4 border rounded-lg bg-card"
                >
                  <div className="p-3 bg-accent/20 rounded-full">
                    <ach.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">{ach.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
