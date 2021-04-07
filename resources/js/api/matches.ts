import {bxios} from "../bxios";
import {Id, MatchType} from "../types";

export const matches = {
    index: () => bxios()
        .get('matches')
        .send<MatchType[]>(), // FIXME: resource,
    show: (id: Id) => bxios()
        .get('matches', id)
        .send<MatchType>(),
};
