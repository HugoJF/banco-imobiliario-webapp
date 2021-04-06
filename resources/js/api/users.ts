import {bxios} from "../bxios";
import {UserType} from "../types/users";

export const users = {
    index: () => bxios()
        .get('users')
        .send<UserType[]>(),
};
