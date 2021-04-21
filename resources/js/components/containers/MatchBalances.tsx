import React from 'react';
import {MatchType} from "../../types";
import {Title} from "../ui/Title";
import {UserList} from "../UserList";
import {UserType} from "../../types/users";
import {DollarSign} from "react-feather";
import {formatNumber} from "../helpers/helpers";
import {Stat} from "../ui/Stat";

type Props = {
    match: MatchType;
    balances: { [id: string]: number }
}

export const MatchBalances: React.FC<Props> = ({match, balances}) => {
    return <div>
        <Title>Saldos</Title>

        <UserList
            users={match.users}
            clickable={false}
        >
            {(user: UserType) => <Stat icon={DollarSign}>
                {formatNumber(balances[String(user.id)]).join('')}
            </Stat>}
        </UserList>
    </div>
};
