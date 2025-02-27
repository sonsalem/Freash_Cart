export interface CatTypes {
  results: number;
  metadata: Metadata;
  data: CategoryDate[];
}

export interface CategoryDate {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
