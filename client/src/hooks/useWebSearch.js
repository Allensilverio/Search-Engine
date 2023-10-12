import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useWebSearch(searchTerm, startRowIndex, maximumRows) {
  const [searchResults, setSearchResults] = useState([]);

  /*useEffect(() => {
    setSearchResults([]); 
  }, [searchTerm]);*/

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/datos', {
  //         params: {
  //           criterio: searchTerm,
  //           startRowIndex: startRowIndex,
  //           maximumRows: maximumRows,
  //         },
  //       });
  //       console.log(searchResults);
  //       setSearchResults(response.data);
  //     } catch (error) {
  //     }
  //   };

  //   fetchData();

  // }, []);

  return searchResults;
}
