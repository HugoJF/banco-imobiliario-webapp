import React from 'react';
import {useParams} from "react-router";
import {Loader} from "react-feather";
import {MatchTransactions} from "../pages/MatchTransactions";
import {useMatchTransactions} from "../../queries/useMatchTransactions";
import usePagination from "../../hooks/usePagination";

export const MatchTransactionsContainer: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const pagination = usePagination();
    const transactions = useMatchTransactions(id, pagination.page);

    if (!transactions.data) {
        return <Loader/>;
    }

    return <MatchTransactions
        transactions={transactions.data.data.data}
        page={pagination.page}
        maxPage={transactions.data.data.meta.last_page}
        onPagination={pagination.goToPage}
    />
};
