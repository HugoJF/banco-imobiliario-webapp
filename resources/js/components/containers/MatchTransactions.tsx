import React from 'react';
import {Title} from "../ui/Title";
import {TransactionType} from "../../types/transactions";
import {Pagination} from "../ui/Pagination";
import {HorizontalButton} from "../ui/HorizontalButton";
import {Stat} from "../ui/Stat";
import {Clock, DollarSign} from "react-feather";
import {formatDistanceToNow, parseISO} from "date-fns";
import useConfirmation from "../../hooks/useConfirmation";
import clsx from "clsx";
import {useTransactionCancel} from "../../mutations/useTransactionCancel";
import {formatNumber} from "../helpers/helpers";

type Props = {
    transactions: TransactionType[];
    page: number;
    maxPage: number;
    onPagination: (page: number) => void;
}

export const MatchTransactions: React.FC<Props> = ({transactions, page, maxPage, onPagination}) => {
    const confirmation = useConfirmation();
    const transactionCancel = useTransactionCancel();

    function dateToHuman(date: string) {
        if (!date) {
            return null;
        }

        const parsedDate = parseISO(date);

        return formatDistanceToNow(parsedDate, {addSuffix: true});
    }

    async function handleOnCancel(transaction: TransactionType) {
        const canceled = await confirmation.confirm({
            title: `Deseja cancelar a transação ${transaction.id}?`,
            description: <>Transação de{' '}
                <strong>{formatNumber(transaction.value).join('')}</strong>
                {' '}de{' '}
                <strong>{transaction.origin?.name}</strong>
                {' '}para{' '}
                <strong>{transaction.destination?.name}</strong>
            </>,
            action: 'Cancelar',
        });

        if (canceled) {
            await transactionCancel.mutateAsync(transaction.id);
        }
    }

    return <div className="space-y-8">
        <Title>Transações</Title>

        {confirmation.modal}

        <ul className="space-y-4">
            {transactions.map(transaction => <HorizontalButton onClick={() => handleOnCancel(transaction)}>
                <div
                    className={clsx('space-y-2 md:space-y-0 w-full flex flex-col items-center md:flex-row', {
                        'opacity-25': Boolean(transaction.canceled_at),
                    })}
                >
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
