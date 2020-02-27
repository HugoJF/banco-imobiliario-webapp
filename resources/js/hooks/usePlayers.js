import React from 'react';
import {useSelector} from "react-redux";

export default function () {
    return useSelector(state => state.players);
}
