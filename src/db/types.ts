import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Notes = {
    id: Generated<string>;
    title: string;
    content: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    authorId: string;
};
export type SharingAccess = {
    id: Generated<string>;
    noteId: string;
    userId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type User = {
    id: Generated<string>;
    displayName: string;
    email: string;
    hashedPassword: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DB = {
    Notes: Notes;
    SharingAccess: SharingAccess;
    User: User;
};
