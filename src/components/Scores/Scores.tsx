import React, {useMemo, useState} from 'react';
import {AgGridReact} from "ag-grid-react";
import "./Scores.css"
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import useScores from "./useScores";
import IdCellRenderer from "../IdCellRenderer/IdCellRenderer";
import ColumnFilter from "../ColumnFilter/ColumnFilter";

const Scores = ({numberOfRowsInPage = 10}) => {
    const title = "Tournament 101 - Final Results";
    const gridStyle = useMemo(() => ({ height: '473px', width: '90%' }), []);
    const { isLoading, rowData, page, error, handleSearch, handleLevelFilter, maxPages,
        totalNumberOfRows, numberOfFilteredRows, handlePageChange, pageInputValue, handlePaginationButtons } = useScores(numberOfRowsInPage);
    const [columnDefs] = useState([
        { field: 'id', flex: 1, cellRenderer: (props: any) => <IdCellRenderer id={props.data.id} />, suppressMovable:true},
        { field: 'name', flex: 1, cellStyle: { textTransform: 'capitalize' }, suppressMovable:true },
        { field: 'level', flex: 1, headerComponent: ColumnFilter, headerComponentParams: {onLevelSelected: handleLevelFilter, indexOfColumnName: 1}, suppressMovable:true},
        { field: 'score', flex: 1, suppressMovable:true }
    ]);

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
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                />
                <div className="pagination-buttons">
                    <button className="pagination-button previous"
                        onClick={handlePaginationButtons}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <button className="pagination-button next"
                        onClick={handlePaginationButtons}
                        disabled={page  === maxPages}
                    >
                        Next
                    </button>
                </div>
                <div className="stats">
                    <span className="filtered-rows">Filtered Scores: {numberOfFilteredRows}</span>
                    <span className="total-rows">Total Scores: {totalNumberOfRows}</span>
                    <span className="total-pages">Number of pages: {maxPages}</span>
                </div>
                <span className="set-page-text">Go to  page number: </span>
                <input type="text" className="set-page" onChange={handlePageChange} value={pageInputValue}/>
            </div>
        </div>
    );
};

export default Scores;
