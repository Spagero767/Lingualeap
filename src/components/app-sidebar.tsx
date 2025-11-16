'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  BookOpen,
  BotMessageSquare,
  Home,
  Repeat,
  UserCircle,
} from 'lucide-react';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from '@/components/ui/sidebar';
import {Separator} from '@/components/ui/separator';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

const navItems = [
  {href: '/dashboard', icon: Home, label: 'Dashboard'},
  {href: '/lessons', icon: BookOpen, label: 'Lessons'},
  {href: '/review', icon: Repeat, label: 'Review'},
  {href: '/grammar-tool', icon: BotMessageSquare, label: 'Grammar AI'},
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary"
          >
            <path d="M18 8V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" />
            <path d="M2 8h20" />
            <path d="M17.5 12c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5Z" />
            <path d="M6 12h5" />
            <path d="M6 16h3" />
          </svg>
          <h1 className="text-xl font-bold font-headline text-primary">
            LinguaLeap
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map(item => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <Link href="/profile" passHref>
          <SidebarMenuButton tooltip="Profile" isActive={pathname === '/profile'}>
            <Avatar className="h-7 w-7">
              <AvatarImage
                src="https://picsum.photos/seed/user-avatar/40/40"
                data-ai-hint="person avatar"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span>Your Profile</span>
          </SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </>
  );
}
