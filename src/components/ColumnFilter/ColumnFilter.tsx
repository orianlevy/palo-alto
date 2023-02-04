import React, { useMemo} from 'react';
import "./ColumnFilter.css"
import {useQuery} from "react-query";
import {IScore} from "../Scores/useScores";
interface IPropsColumnFilter {
    onFilterSelected: ()=>{}
    indexOfColumnName: number
}

const ColumnFilter = (props: IPropsColumnFilter) => {
    const { data  } = useQuery<IScore[]>(
        ["scores" ,0, 10, "", ""],
        {
            keepPreviousData: true,
        }
    );

    const columnName = useMemo( () => {
        if (data) {
            return Object.keys(data[0])[props.indexOfColumnName].charAt(0).toUpperCase() + Object.keys(data[0])[props.indexOfColumnName].slice(1).toLowerCase();
        }
        return "";

    }, [data]);

    const optionItems = useMemo( () => {
        if (data) {
            if (columnName === "Level") {
                return data.map(item => item.level).filter((value, index, self) => self.indexOf(value) === index);
            }
        }
        return [""]

    }, [data, columnName]);


    return (
        <div className={"filter" + columnName}>
            <span>{columnName} </span>
            <select className={"filterSelector" + columnName} onChange={props.onFilterSelected}>
                <option value=""></option>
                {optionItems.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>))}
            </select>
        </div>
    );
};

export default ColumnFilter;
