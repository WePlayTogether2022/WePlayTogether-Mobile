export interface Console {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  logoImageUrl: string;
  yearStart: number | null;
  yearEnd: number | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
