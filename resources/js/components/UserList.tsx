import React from 'react';
import {UserListItem} from "./UserListItem";
import {UserType} from "../types";

export type UserListProps = {
    clickable?: boolean;
    users: UserType[];
}

export const UserList: React.FC<UserListProps> = ({clickable = true, users}) => {
    return <div className="space-y-4">
        {users.map(user => <UserListItem clickable={clickable} user={user}/>)}
    </div>
};
