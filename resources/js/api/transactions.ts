import {bxios} from "../bxios";
import {Id, MatchProperties, MatchType, PaginatedResource, Resource} from "../types";
import {TransactionRequest} from "../types/match";
import {TransactionType} from "../types/transactions";

export const transactions = {
    cancel: (id: Id) => bxios()
        .patch('transactions', id, 'cancel')
        .send<TransactionType>(), // FIXME: resource,
};
