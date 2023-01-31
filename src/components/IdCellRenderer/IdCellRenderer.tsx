import React, {useMemo} from 'react';
import {useQuery} from "react-query";
import { ReactComponent as SuspectIcon } from '../../assets/suspect.svg';
import "./IdCellRenderer.css"
interface IPropsIdCellRenderer {
    id: number
}

const IdCellRenderer = ({ id } : IPropsIdCellRenderer) => {
    const { data : suspectsArray } = useQuery<number[]>(
        ["suspects"],
        {
            keepPreviousData: true,
        }
    );

    const isSuspect = useMemo(() =>
        suspectsArray && suspectsArray.includes(id)
    , [id]);

    return (
        <div>
            {isSuspect ? <div className="suspect">{id} <SuspectIcon className="suspectIcon"/></div> : <div>{id}</div>}
        </div>
    );
};

export default IdCellRenderer;
