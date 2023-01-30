import React, {useMemo} from 'react';
import {useQuery} from "react-query";
import { ReactComponent as SuspectIcon } from '../assets/suspect.svg';
interface IProps {
    id: number
}

const IdCellRenderer = ({ id } : IProps) => {
    const { data : suspectsArray } = useQuery<number[]>(
        ["suspects"],
        {
            keepPreviousData: true,
        }
    );

    let isSuspect = useMemo(() =>
        suspectsArray && suspectsArray.includes(id)
    , [id]);

    return (
        <div>
            {isSuspect ? <div style={{ display: "flex", justifyContent : "center" }}>{id} <SuspectIcon style={{ margin: "4px" }}/></div> : <div>{id}</div>}
        </div>
    );
};

export default IdCellRenderer;
