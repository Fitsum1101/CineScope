export interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string; // ISO date string
  id: string;
  updated_at: string; // ISO date string
  url: string;
}
