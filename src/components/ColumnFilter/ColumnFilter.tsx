import React from 'react';
import "./ColumnFilter.css"
interface IPropsColumnFilter {
    onLevelSelected: ()=>{}
}
const ColumnFilter = (props: IPropsColumnFilter) => {
    return (
        <div className="levelFilter">
            <span>Level </span>
            <select className="levelFilterSelector" onChange={props.onLevelSelected}>
                <option value=""></option>
                <option value="rookie">Rookie</option>
                <option value="amateur">Amateur</option>
                <option value="pro">Pro</option>
            </select>
        </div>
    );
};

export default ColumnFilter;
