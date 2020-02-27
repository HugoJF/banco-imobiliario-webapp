import React from 'react';
import {useSelector} from "react-redux";

export default function useMe() {
    return useSelector(state => state.me);
}
