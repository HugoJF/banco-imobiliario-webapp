import React from 'react';
import {UserListItem} from "./UserListItem";
import {UserType} from "../types/users";
import {HorizontalButton} from "./ui/HorizontalButton";
import {PageLoader} from "./containers/PageLoader";
import clsx from "clsx";
import {Stat} from "./ui/Stat";
import {Activity} from "react-feather";

export type UserListProps = {
    selected?: number;
    bank?: boolean;
    clickable?: boolean;
    onClick?: (user: null|UserType) => void;
    users: UserType[];
    children?: (user: UserType) => JSX.Element
    loading?: boolean;
}

export const UserList: React.FC<UserListProps> = ({selected, clickable = true, loading = false, bank = false, onClick, users, children}) => {

    return <PageLoader loading={loading}>
        {users.length === 0 && <HorizontalButton clickable={false}>
            <h2 className="text-lg text-black font-bold tracking-tight">
                Nenhum usuário
            </h2>
        </HorizontalButton>}

        {/* Bank */}
        <HorizontalButton
            onClick={() => onClick && onClick(null)}
            clickable={clickable}
            className={clsx({
                'border-4 border-blue-500': selected === undefined,
            })}
        >
            {/* User name */}
            <h2 className="text-xl text-black font-bold tracking-tight">
                Banco
            </h2>
        </HorizontalButton>

        {/* Actual users */}
        {users.map(user => <UserListItem
            key={user.id}
            selected={user.id === selected}
            clickable={clickable}
            onClick={onClick}
            user={user}
            children={children}
        />)}
    </PageLoader>
};
