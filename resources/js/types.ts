import {UserType} from "./types/users";

export type Id = string | number;

export type Resource<T> = {
    data: T;
}

export type LaravelErrors<T extends string | number | symbol> = {
    [key in T]: string[]
}

export type LaravelErrorBag<T extends string | number | symbol> = {
    message: string;
    errors: LaravelErrors<T>
}

export type Timestamps = {
    updated_at: string;
    created_at: string;
}

export type SoftDeletes = {
    deleted_at: string;
}

// TODO: move
export type MatchType = MatchProperties &
    MatchComputedProperties &
    MatchRelationships &
    MatchDates &
    Timestamps;

export type MatchRelationships = {
    users: UserType[];
}

export type MatchProperties = {
    starting_money: number;
}

export type MatchComputedProperties = {
    id: Id;
    turn: number;
}

export type MatchDates = {
    started_at: string | null;
}
