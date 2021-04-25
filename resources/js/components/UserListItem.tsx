import React from 'react';
import {Activity} from "react-feather";
import {Stat} from "./ui/Stat";
import {HorizontalButton} from "./ui/HorizontalButton";
import {UserType} from "../types/users";
import clsx from "clsx";

export type UserListItemProps = {
    selected: boolean;
    clickable?: boolean;
    onClick?: (user: UserType) => void;
    user: UserType;
    children?: (user: UserType) => JSX.Element
}

export const UserListItem: React.FC<UserListItemProps> = ({clickable, onClick, user, selected = false, children}) => {
    return <HorizontalButton
        onClick={() => onClick && onClick(user)}
        clickable={clickable}
        className={clsx({
            'border-4 border-blue-500': selected,
        })}
    >
        {/* User name */}
        <h2 className="text-xl text-black font-bold tracking-tight">
            {user.name}
        </h2>

        {/* User rounds */}
        <Stat icon={Activity}>
            {user.match_count}
        </Stat>

        {children && children(user)}
    </HorizontalButton>
};
