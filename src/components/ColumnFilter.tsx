import React from 'react';

interface IProps {
    onLevelSelected: ()=>{}
}
const ColumnFilter = (props: IProps) => {
    return (
        <div style={{ margin: "auto" }}>
            <span>Level </span>
            <select onChange={props.onLevelSelected} style={{ outline: "none" }}>
                <option value=""></option>
                <option value="rookie">Rookie</option>
                <option value="amateur">Amateur</option>
                <option value="pro">Pro</option>
            </select>
        </div>
    );
};

export default ColumnFilter;
