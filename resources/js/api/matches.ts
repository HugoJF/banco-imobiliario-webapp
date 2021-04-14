import {bxios} from "../bxios";
import {Id, MatchProperties, MatchType} from "../types";

export const matches = {
    index: () => bxios()
        .get('matches')
        .send<MatchType[]>(), // FIXME: resource,
    show: (id: Id) => bxios()
        .get('matches', id)
        .send<MatchType>(),
    balances: (id: Id) => bxios()
        .get('matches', id, 'balances')
        .send<{[id: string]: number}>(),
    join: (id: Id) => bxios()
        .post('matches', id, 'join')
        .send<MatchType>(),
    leave: (id: Id) => bxios()
        .delete('matches', id, 'leave')
        .send(),
    next: (id: Id) => bxios()
        .patch('matches', id, 'next')
        .send(),
    leaveAll: () => bxios()
        .delete('matches', 'leave')
        .send(),
    store: (data: MatchProperties) => bxios()
        .post('matches')
        .body(data)
        .send<MatchType>(),
};
