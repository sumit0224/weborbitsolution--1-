import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  image?: string;
  icon?: ReactNode;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
}