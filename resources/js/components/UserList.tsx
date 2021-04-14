import React from 'react';
import {UserListItem} from "./UserListItem";
import {UserType} from "../types/users";
import {HorizontalButton} from "./ui/HorizontalButton";

export type UserListProps = {
    clickable?: boolean;
    onClick?: (user: UserType) => void;
    users: UserType[];
    children?: (user: UserType) => JSX.Element
}

export const UserList: React.FC<UserListProps> = ({clickable = true, onClick, users, children}) => {
    return <div className="space-y-4">
        {users.length === 0 && <HorizontalButton clickable={false}>
            <h2 className="text-lg text-black font-bold tracking-tight">
                Nenhum usuário
            </h2>
        </HorizontalButton>}

        {users.map(user => <UserListItem
            key={user.id}
            clickable={clickable}
            onClick={onClick}
            user={user}
            children={children}
        />)}
    </div>
};
