import {Timestamps} from "../types";
import {UserType} from "./users";

export type TransactionType = TransactionProperties &
    TransactionRelationshipProperties &
    TransactionComputedProperties &
    Timestamps;

export type TransactionProperties = {
    value: number;
    email: string;
}

export type TransactionRelationshipProperties = {
    match_id: number;
    origin: UserType|null;
    destination: UserType|null;
    origin_id: number|null;
    destination_id: number|null;
}

export type TransactionComputedProperties = {
    id: number;
    match_count: number;
    canceled_at: string;
}
