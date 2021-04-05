import React from 'react';
import {Activity} from "react-feather";
import {UserType} from "../types";
import {Stat} from "./ui/Stat";
import {HorizontalButton} from "./ui/HorizontalButton";

export type UserListItemProps = {
    clickable?: boolean;
    user: UserType;
}

export const UserListItem: React.FC<UserListItemProps> = ({clickable, user}) => {
    return <HorizontalButton clickable={clickable}>
        {/* User name */}
        <h2 className="text-3xl text-black font-bold tracking-tight">
            {user.name}
        </h2>

        {/* User rounds */}
        <Stat icon={Activity}>
            {user.matches}
        </Stat>
    </HorizontalButton>
};
