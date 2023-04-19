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
  },
  bannerImage: string;
  genres?: string[];
  description: string;
  isFavourite?: boolean;
}

export type AnimeListType = {
  data: {
    Page: {
      media: Animetype[];
    }
  }
}

export type PageOptType = {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}