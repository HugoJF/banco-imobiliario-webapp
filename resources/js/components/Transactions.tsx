import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "@reach/router";
import useTransactions from "../hooks/useTransactions";
import Title from "./ui/Title";
import PaddedButton from "./ui/PaddedButton";
import Transaction from "./ui/Transaction";

export default function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const transactions = useTransactions();

    function goBack() {
        navigate('/');
    }

    return <div>
        <Title>Transações</Title>
        {
            Object.keys(transactions).map(Number).sort((b, a) => a - b).map((id) => (
                <Transaction transaction={transactions[id]}/>
            ))
        }

        <PaddedButton className="mt-4" onClick={goBack} color="gray">
            Voltar
        </PaddedButton>
    </div>
}
