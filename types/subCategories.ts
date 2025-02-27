export interface SubCategoriesData {
  results: number;
  metadata: Metadata;
  data: SubCategoriesProps[];
}

export interface SubCategoriesProps {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
