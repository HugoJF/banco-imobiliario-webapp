import {bxios} from "../bxios";
import {Id, MatchProperties, MatchType} from "../types";

export const matches = {
    index: () => bxios()
        .get('matches')
        .send<MatchType[]>(), // FIXME: resource,
    show: (id: Id) => bxios()
        .get('matches', id)
        .send<MatchType>(),
    store: (data: MatchProperties) => bxios()
        .post('matches')
        .body(data)
        .send<MatchType>(),
};
