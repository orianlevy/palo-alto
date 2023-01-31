import React from 'react';
import "./ColumnFilter.css"
import {useQuery} from "react-query";
import {IScore} from "../Scores/useScores";
interface IPropsColumnFilter {
    onLevelSelected: ()=>{}
    indexOfColumnName: number
}

const ColumnFilter = (props: IPropsColumnFilter) => {
    const { data  } = useQuery<IScore[]>(
        ["scores" ,0, 10, "", ""],
        {
            keepPreviousData: true,
        }
    );

    const columnName = data ? Object.keys(data[0])[props.indexOfColumnName].charAt(0).toUpperCase() + Object.keys(data[0])[props.indexOfColumnName].slice(1).toLowerCase() : "";

    const columnFilterItems = data ? data.map(item => item.level).filter((value, index, self) => self.indexOf(value) === index) : [];

    return (
        <div className="levelFilter">
            <span>{columnName} </span>
            <select className="levelFilterSelector" onChange={props.onLevelSelected}>
                <option value=""></option>
                {columnFilterItems.map((level, index) => (
                    <option key={index} value={level}>
                        {level}
                    </option>))}
            </select>
        </div>
    );
};

export default ColumnFilter;
