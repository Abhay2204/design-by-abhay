export interface Project {
  id: number;
  title: string;
  category: string;
  videoId: string;
  websiteUrl: string;
}

export interface LoaderProps {
  onComplete: () => void;
}