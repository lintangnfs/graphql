export type Animetype = {
  id: string;
  image: string;
  title: {
    english: string;
    native: string;
  };
  score?: number;
  popularity?: number;
  coverImage: {
    large: string;
  }
}