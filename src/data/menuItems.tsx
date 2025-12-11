import type { MenuItem } from '@/types/MenuItem';
import { Home, MessageSquare, History, FileText, User, Users, ChartPie } from 'lucide-react';

export const menuItems: MenuItem[] = [
  { id: '1', icon: Home, label: '홈', path: '/' },
  { id: '2', icon: MessageSquare, label: '코칭', path: '/coaching' },
  { id: '3', icon: History, label: '히스토리', path: '/history' },
  { id: '4', icon: FileText, label: '후기', path: '/review' },
  { id: '5', icon: User, label: '마이', path: '/my' },
];

export const adminMenuItems: MenuItem[] = [
  { id: '1', icon: Home, label: '홈', path: '/' },
  { id: '2', icon: History, label: '히스토리', path: '/history' },
  { id: '3', icon: FileText, label: '후기 관리', path: '/review' },
  { id: '4', icon: MessageSquare, label: '질문 관리', path: '/question' },
  { id: '5', icon: Users, label: '사용자 관리', path: '/user-management' },
  { id: '6', icon: ChartPie, label: '통계', path: '/statistics' },
  { id: '7', icon: User, label: '마이', path: '/my' },
];
