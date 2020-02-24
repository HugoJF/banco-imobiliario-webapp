import React from 'react';
import {useSelector} from "react-redux";

export default function useMatch() {
    return useSelector(state => state.match);
}
