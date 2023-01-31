import React, {useMemo, useState} from 'react';
import {useQuery} from "react-query";

const useScores = (numberOfRowsInPage: number) => {
    const [page, setPage] = useState(1);
    const [totalNumberOfRows, setTotalNumberOfRows] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [levelFilter, setLevelFilter] = useState("");
    const [maxPages, setMaxPages] = useState(0);


    const handleSearch = (e: any) => {
        setSearchValue(e.target.value.toLowerCase());
        setPage(1);
    };

    const handleLevelFilter = (e: any) => {
        setLevelFilter(e.target.value);
        setPage(1);

    };

    const fetchSuspects = async ({ queryKey } : any) => {
        const response = await fetch(`http://localhost:20000/api/v1/players/suspects`);

        return response.json();
    };

    useQuery(
        ["suspects"],
        fetchSuspects,
        {
            keepPreviousData: true,
        }
    );

    const fetchScores = async ({ queryKey } : any) => {
        const response = await fetch(
            `http://localhost:20000/api/v1/players?start=${queryKey[1]}&n=${queryKey[2]}&search=${queryKey[3]}&level=${queryKey[4]}`
        ).then(res => {
            setTotalNumberOfRows(parseInt(res.headers.get('x-total') ?? '0'));
            return res;
        });

        return response.json();
    };

    const { data, isLoading, error } = useQuery(
        ["scores", numberOfRowsInPage * (page-1), numberOfRowsInPage, searchValue, levelFilter],
        fetchScores,
        {
            keepPreviousData: true,
        }
    );
    useMemo(() => {
        totalNumberOfRows === 0 ? setMaxPages(1) : setMaxPages(Math.floor(totalNumberOfRows / numberOfRowsInPage))
    }, [totalNumberOfRows]);

    return {
        page: page,
        setPage: setPage,
        rowData: data,
        isLoading: isLoading,
        error: error,
        handleSearch: handleSearch,
        handleLevelFilter: handleLevelFilter,
        maxPages: maxPages
    };
};

export default useScores;
