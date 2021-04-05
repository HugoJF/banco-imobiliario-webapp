export type Timestamps = {
    updated_at: string;
    created_at: string;
}

export type SoftDeletes = {
    deleted_at: string;
}

export type UserType = {
    id: number;
    name: string;
    email: string;
    matches: number;
}

export type MatchType = Timestamps & {
    id: string; // FIXME: number or string?
    rounds: number;
    users: UserType[];
    started_at: string|null;
}
