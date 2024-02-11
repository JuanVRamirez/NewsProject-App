export type NewsData = {
  title?: string;
  source: {
    id: string;
    name: string;
  };
  author?: string;
  type?: string;
  publishedAt?: string;
  url?: string;
  urlToImage?: string;
};
