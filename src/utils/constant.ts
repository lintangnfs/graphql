export type Animetype = {
  id: string;
  image: string;
  title: {
    english: string;
    native: string;
  };
  popularity?: number;
  averageScore?: number;
  coverImage: {
    large: string;
  }
}

export type PageOptType = {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}