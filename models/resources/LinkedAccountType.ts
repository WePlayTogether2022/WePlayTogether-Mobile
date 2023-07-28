export interface LinkedAccountType {
    id: number;
    name: string;
    iconUrl: string;
    oauth2Enabled: boolean;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}