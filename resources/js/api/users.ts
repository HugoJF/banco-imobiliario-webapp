import {bxios} from "../bxios";
import {UserType} from "../types/users";
import {Resource} from "../types";

export const users = {
    index: () => bxios()
        .get('users')
        .send<Resource<UserType[]>>(),
    register: () => bxios()
        .post('users')
        .send<Resource<UserType>>()
};
