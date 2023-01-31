import {useMemo, useState} from 'react';
import {useQuery} from "react-query";

const useScores = (numberOfRowsInPage: number) => {
    const [page, setPage] = useState(1);
    const [pageInputValue, setPageInputValue] = useState("");
    const [totalNumberOfRows, setTotalNumberOfRows] = useState(0);
    const [numberOfFilteredRows, setNumberOfFilteredRows] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [levelFilter, setLevelFilter] = useState("");
    const [maxPages, setMaxPages] = useState(0);

    const fetchSuspects = async () => {
        const response = await fetch(`http://localhost:20000/api/v1/players/suspects`);

        return response.json();
    };

    const fetchScores = async ({ queryKey } : any) => {
        const response = await fetch(
            `http://localhost:20000/api/v1/players?start=${queryKey[1]}&n=${queryKey[2]}&search=${queryKey[3]}&level=${queryKey[4]}`
        ).then(res => {
            setNumberOfRowsFromHeader(parseInt(res.headers.get('x-total') ?? ''));
            return res;
        });

        return response.json();
    };

    useQuery(
        ["suspects"],
        fetchSuspects,
        {
            keepPreviousData: true,
        }
    );

    const { data, isLoading, error } = useQuery(
        ["scores", numberOfRowsInPage * (page-1), numberOfRowsInPage, searchValue, levelFilter],
        fetchScores,
        {
            keepPreviousData: true,
        }
    );

    const handleSearch = (e: any) => {
        setSearchValue(e.target.value.toLowerCase());
        setPage(1);
        setPageInputValue("1");
    };

    const handleLevelFilter = (e: any) => {
        setLevelFilter(e.target.value);
        setPage(1);
        setPageInputValue("1");
    };

    const handlePaginationButtons = (e: any) => {
        const classValue = e.target.className;
        if (classValue.includes("previous")) {
            setPage((currPage) => currPage - 1);
            setPageInputValue((currPage)=>(Number(currPage)-1).toString());
        }
        else if (classValue.includes("next")) {
            setPage((currPage) => currPage + 1);
            setPageInputValue((currPage)=>(Number(currPage)+1).toString());
        }
    };

    const setNumberOfRowsFromHeader = async (numberOfRowsOnHeader: number) => {
        if (searchValue || levelFilter) {
            setNumberOfFilteredRows(numberOfRowsOnHeader);
        }
        else {
            setTotalNumberOfRows(numberOfRowsOnHeader);
            setNumberOfFilteredRows(0);
        }
    };

    const handlePageChange = (e: any) => {
        const value = e.target.value;

        if (!value) {
            setPage(1);
            setPageInputValue("");
            return;
        }

        if (0 < value && value < maxPages+1 ) {
            setPage(parseInt(value));
            setPageInputValue(value);
        }
        else {
            setPageInputValue((prevState)=>(prevState));
        }
    };

    useMemo(() => {
        if (searchValue || levelFilter) {
            numberOfFilteredRows === 0 ? setMaxPages(1) : setMaxPages(Math.ceil(numberOfFilteredRows / numberOfRowsInPage));
        }
        else {
            totalNumberOfRows === 0 ? setMaxPages(1) : setMaxPages(Math.ceil(totalNumberOfRows / numberOfRowsInPage));
        }

    }, [totalNumberOfRows, numberOfFilteredRows]);


    return {
        page: page,
        rowData: data,
        isLoading: isLoading,
        error: error,
        handleSearch: handleSearch,
        handleLevelFilter: handleLevelFilter,
        maxPages: maxPages,
        totalNumberOfRows: totalNumberOfRows,
        numberOfFilteredRows: numberOfFilteredRows,
        handlePageChange: handlePageChange,
        pageInputValue: pageInputValue,
        setPageInputValue: setPageInputValue,
        handlePaginationButtons: handlePaginationButtons
    };
};

export default useScores;
