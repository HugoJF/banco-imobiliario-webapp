import React from 'react';
import {UserListItem} from "./UserListItem";
import {UserType} from "../types/users";

export type UserListProps = {
    clickable?: boolean;
    onClick?: (user: UserType) => void;
    users: UserType[];
}

export const UserList: React.FC<UserListProps> = ({clickable = true, onClick, users}) => {
    return <div className="space-y-4">
        {users.map(user => <UserListItem
            key={user.id}
            clickable={clickable}
            onClick={onClick}
            user={user}
        />)}
    </div>
};
