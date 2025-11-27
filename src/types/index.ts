export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string; // Make optional
  githubUrl?: string;
  behanceUrl?: string;
  image: string;
  images?: string[]; // Add multiple images for design projects
  featured: boolean;
  category: 'web' | 'design' | 'data';
}


export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'data' | 'tools';
  level: number;
}