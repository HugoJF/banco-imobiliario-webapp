import React from 'react';
import {Title} from "../ui/Title";
import {Button} from "../ui/Button";
import {ButtonGroup} from "../ui/ButtonGroup";
import {MatchType} from "../../types";
import {HorizontalButton} from "../ui/HorizontalButton";

export type MatchContainerType = {
    match: MatchType;
}

export const MatchContainer: React.FC<MatchContainerType> = ({match}) => {
    return <div className="space-y-8">
        <Title>Partida #{match.id}</Title>


        <HorizontalButton>
            <h2 className="text-3xl text-black font-bold tracking-tight">
                Pagar
            </h2>
        </HorizontalButton>
        <HorizontalButton>
            <h2 className="text-3xl text-black font-bold tracking-tight">
                Saldos
            </h2>
        </HorizontalButton>


        <ButtonGroup>
            <Button>Próxima rodada</Button>
            <Button color="default">Finalizar partida</Button>
        </ButtonGroup>
    </div>
};
