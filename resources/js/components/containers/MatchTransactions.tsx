import React from 'react';
import {MatchType} from "../../types";
import {Title} from "../ui/Title";
import {TransactionType} from "../../types/transactions";
import {Pagination} from "../ui/Pagination";
import {HorizontalButton} from "../ui/HorizontalButton";
import {Stat} from "../ui/Stat";
import {Clock, DollarSign} from "react-feather";
import {formatDistanceToNow, parseISO} from "date-fns";

type Props = {
    transactions: TransactionType[];
    page: number;
    maxPage: number;
    onPagination: (page: number) => void;
}

export const MatchTransactions: React.FC<Props> = ({transactions, page, maxPage, onPagination}) => {
    function dateToHuman(date: string) {
        if (!date) {
            return null;
        }

        const parsedDate = parseISO(date);

        return formatDistanceToNow(parsedDate, {addSuffix: true});
    }

    return <div className="space-y-8">
        <Title>Saldos</Title>

        <ul className="space-y-4">
            {transactions.map(transaction => <HorizontalButton>
                <div className="space-y-2 md:space-y-0 w-full flex flex-col items-center md:flex-row ">
                    <h2 className="md:w-1/4 text-xl text-black font-bold tracking-tight overflow-hidden overflow-ellipsis">
                        {transaction?.origin?.name ?? 'Banco'}
                    </h2>

                    <div className="md:w-1/4">
                        <Stat icon={DollarSign}>
                            {transaction.value}
                        </Stat>
                    </div>

                    <h2 className="md:w-1/4 text-xl text-black font-bold tracking-tight overflow-hidden overflow-ellipsis">
                        {transaction?.destination?.name ?? 'Banco'}
                    </h2>

                    <div className="md:w-1/4">
                        <Stat icon={Clock}>
                            {dateToHuman(transaction?.created_at)}
                        </Stat>
                    </div>
                </div>
            </HorizontalButton>)}
        </ul>

        <Pagination
            current={page}
            max={maxPage}
            onPagination={onPagination}
        />
    </div>
};
