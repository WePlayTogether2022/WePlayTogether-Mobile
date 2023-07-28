export interface CountryFlag {
  dynamicUrl: string;
  default: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Country {
  id: number;
  iso: string;
  name: string;
  nicename: string;
  iso3: string;
  numCode: number;
  phoneCode: number;
  createdAt: Date;
  updatedAt: Date;

  flag: CountryFlag | null;
}
