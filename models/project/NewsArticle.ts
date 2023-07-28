export interface NewsArticle {
  id: number;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  games: string | string[];
  interactionCount: number;
  totalPoints: number | null;
}
