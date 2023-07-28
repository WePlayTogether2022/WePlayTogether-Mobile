export interface CreateGuildDto {
  countryId: number;

  name: string;
  description: string | null;
  websiteUrl: string | null;

  // Utilizzato per il file upload
  logoUrl: string;
}

export interface UpdateGuildDto {
  countryId: number;

  name: string;
  description: string | null;
  websiteUrl: string | null;

  logoUrl?: string;
}
