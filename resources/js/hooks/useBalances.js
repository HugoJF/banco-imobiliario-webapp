import React from 'react';
import {useSelector} from "react-redux";

export default function useBalances() {
    return useSelector(state => state.balances);
}
