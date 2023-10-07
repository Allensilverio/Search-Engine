import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useWebSearch(searchTerm, startRowIndex, maximumRows) {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/datos', {
                    params: {
                        criterio: searchTerm,
                        startRowIndex: startRowIndex,
                        maximumRows: maximumRows
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchTerm, startRowIndex, maximumRows]);

    return null;
}
