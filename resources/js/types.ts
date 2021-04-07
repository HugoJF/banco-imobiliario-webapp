import {UserType} from "./types/users";

export type Id = string|number;

export type Resource<T> = {
    data: T;
}

export type Timestamps = {
    updated_at: string;
    created_at: string;
}

export type SoftDeletes = {
    deleted_at: string;
}

// TODO: move
export type MatchType = Timestamps & {
    id: string; // FIXME: number or string?
    rounds: number;
    users: UserType[];
    started_at: string|null;
}
