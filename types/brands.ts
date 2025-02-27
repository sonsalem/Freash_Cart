export interface BrandDataProps {
  results: number;
  metadata: Metadata;
  data: BrandProps[];
}

export interface BrandProps {
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
  nextPage: number;
}
