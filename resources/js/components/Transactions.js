import React from 'react';
import {useDispatch} from "react-redux";
import useTransactions from "../hooks/useTransactions";
import Title from "./ui/Title";
import PaddedButton from "./ui/PaddedButton";
import {useNavigate} from "@reach/router";
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
            Object.values(transactions).map((transaction) => (
                <Transaction transaction={transaction}/>
            ))
        }

        <PaddedButton className="mt-4" onClick={goBack} color="gray">
            Voltar
        </PaddedButton>
    </div>
}
