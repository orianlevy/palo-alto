import React, {useMemo, useState} from 'react';
import {AgGridReact} from "ag-grid-react";
import "./Scores.css"
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import useScores from "./useScores";
import IdCellRenderer from "./IdCellRenderer";

const Scores = ({propsRows = 10}) => {
    const title = "Tournament 101 - Final Results";
    const gridStyle = useMemo(() => ({ height: '470px', width: '90%' }), []);
    const { numberOfRows, totalNumberOfRows, isLoading, rowData, page, setPage, error, handleSearch, handleLevelFilter } = useScores(propsRows);
    const [columnDefs] = useState([
        { field: 'id', cellRenderer: (props: any) => <IdCellRenderer id={props.data.id} /> },
        { field: 'name', cellStyle: { textTransform: 'capitalize' } },
        { field: 'level' },
        { field: 'score' }
    ]);

    const onGridSizeChanged = (params: any) => {
        params.api.sizeColumnsToFit();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div className="scores-container">
            <span className="scores-title">{title}</span>
            <div className='ag-theme-alpine' style={gridStyle}>
                <input type="text" className="search" placeholder="Search..." onChange={handleSearch}/>
                <span>Level: </span>
                <select onChange={handleLevelFilter}>
                    <option value=""></option>
                    <option value="rookie">Rookie</option>
                    <option value="amateur">Amateur</option>
                    <option value="pro">Pro</option>
                </select>
                <AgGridReact
                    onGridSizeChanged={onGridSizeChanged}
                    rowData={rowData}
                    columnDefs={columnDefs}
                />
                <div className="pagination-buttons">
                    <button className="pagination-button"
                        onClick={() => setPage((currPage) => currPage - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <button className="pagination-button"
                        onClick={() => setPage((currPage) => currPage + 1)}
                        disabled={page  === (totalNumberOfRows === 0 ? 1 : Math.floor(totalNumberOfRows / numberOfRows))}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Scores;
