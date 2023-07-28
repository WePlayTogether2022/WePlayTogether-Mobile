export interface Search {
    id: number;
    userId: number;
    query: string;

    searchCount: number;
    lastSearchAt: Date;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}