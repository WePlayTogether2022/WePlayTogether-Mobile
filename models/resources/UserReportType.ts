export interface UserReportType {
  id: number;
  name: string;
  description: string | null;
  label: string;
  requiredDescription: boolean;

  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
