export type UserType = UserProperties & UserComputedProperties;

export type UserProperties = {
    name: string;
    email: string;
}

export type UserComputedProperties = {
    id: number;
    matches: number;
}
