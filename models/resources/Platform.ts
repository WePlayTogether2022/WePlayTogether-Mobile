import { LinkedAccountType } from "./LinkedAccountType";

export interface Platform {
    id: number;
    linkedAccountTypeId: number;
    uuid: string;
    name: string;
    slug: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    linkedAccountType?: LinkedAccountType;
}