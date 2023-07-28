export interface PsnAccount {
    id: number;
    userId: number;
    accountId: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}