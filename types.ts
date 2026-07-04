export interface ProjectDemo {
  image: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  iconName: string;
  thumbnail?: string;
  demos?: ProjectDemo[];
  highlights?: string[];
  liveUrl?: string;
  ctaLabel?: string;
  interpretation?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  isHighlight?: boolean;
}

export interface TechStackItem {
  name: string;
  category: 'core' | 'language' | 'education' | 'tool';
  icon?: any;
}
