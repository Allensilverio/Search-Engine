import React, { useState, useEffect } from 'react';
import WebsiteCard from '../components/WebsiteCard';
import MyLoader from '../components/MyLoader';
import { useLocation } from 'react-router-dom';

// Estados
function useQuery() {
  const{search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

export default function SearchListFinal() {

    const queryParams = useQuery();
    const location = useLocation();
    const [startRowIndex, setStartRowIndex] = useState(0); // index inicial
    const [maximumRows, setMaximumRows] = useState(10); // Maxima cantidad de filas
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga adicional de resultados
    const [searchResults, setSearchResults] = useState([]);
    const searchTermFromURL = queryParams.get('criterio') || ''; // Obtén el valor del query parameter 'query'  
    const [searchTerm, setSearchTerm] = useState(searchTermFromURL);
    const [initialSearchDone, setInitialSearchDone] = useState(false);



    // Setear el valor del estado search Term

    function handleSearch(event) {
        setSearchTerm(event.target.value);
        setStartRowIndex(0); // Reinicia el índice de inicio cuando se realiza una nueva búsqueda
        setMaximumRows(10); // Restablece la cantidad máxima de resultados por página
      }

    // Funcion para traer de la base de datos

    async function fetchData(searchTerm, startRowIndex, maximumRows) {
        // Fetch data based on the searchTerm
        const response = await fetch(`/api/datos?criterio=${searchTerm}&startRowIndex=${startRowIndex}&maximumRows=${maximumRows}`);
        const data = await response.json();
        // Update the state with the fetched data
        console.log(data)
        return data;
    }
    
    // Hacer busqueda cuando hace Enter (form submit)

    const firstSearch = async (e) => {
        try {
            const data = await fetchData(searchTerm, startRowIndex, maximumRows);
            setSearchResults(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
      if (!initialSearchDone) {
        firstSearch();
        setInitialSearchDone(true);
      }
    }, [initialSearchDone]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await fetchData(searchTerm, startRowIndex, maximumRows);
            setSearchResults(data);
        } catch (e) {
            console.log(e);
        }
    }


    // Cuando desplazo hacia abajo funcion que habilita cargar mas resultados

    useEffect(() => {
        // Función para cargar más resultados cuando el usuario llega al final de la lista
        const handleScroll = () => {
          if (
            window.innerHeight + window.scrollY >=
              document.documentElement.scrollHeight &&
            !isLoading
          ) {
            setIsLoading(true);
            setStartRowIndex(startRowIndex + maximumRows); // Incrementa el índice de inicio
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [maximumRows, isLoading]);



      // Cargar mas resultados

      useEffect(() => {
        const loadMoreResults = async () => {
            setIsLoading(true);
            try {
                const data = await fetchData(searchTerm, startRowIndex, maximumRows);
                if (Array.isArray(data)) { // Ensure data is an array
                    setSearchResults(prev => [...prev, ...data]);
                } else {
                    console.error('API response is not an array', data);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        if(isLoading) {
            loadMoreResults();
        }
    }, [startRowIndex, searchTerm, maximumRows]);
    

    return (

        <div className="h-fit flex flex-col items-center rounded-3xl bg-gradient-to-b from-white/20 backdrop-blur-lg drop-shadow-xl border-[0.5px] border-white/10 space-y-16 my-auto py-10 pl-32 pr-96">
      <div className="flex flex-row items-center justify-center w-11/12 space-x-20">
        <div className="flex flex-row items-center justify-between w-full">
          <img src="/logo.png" alt="logo icono" className="w-[48px]" />
          <h1 className="text-[30px] text-white font-bold">Seekster</h1>
        </div>

        <form onSubmit={handleSubmit} >
          <div className="relative">
            <img
              src="/search-icon-color.svg"
              alt="busqueda icono"
              className="absolute flex items-center ml-[550px] pt-3"
            />
            {/* <img
              src="/x-icon.svg"
              alt="x icono"
              onClick={handleClearClick}
              className="absolute flex items-center ml-[520px] pt-3"
            /> */}

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
              className="bg-white/20 flex items-center justify-center px-3 py-2 rounded-2xl pr-96 pl-10 focus:outline-none text-white/70"
            />

          </div>
        </form>
      </div>
      <div className="w-full space-y-2">
        <hr className="border-white/10" />
        <p className="text-white/70 text-[14px]">Se han encontrado  {searchResults.length} resultados</p>
      </div>

      <div className="space-y-4 w-fit">{searchResults.map((result, index) => (
            <WebsiteCard
              key={index}
              Title={result.Title}
              Url={result.Url}
              Keywords={result.Keywords}
              Description={result.Description}
              Icon={result.Icon}
            />
          ))}
          </div>
          
    </div>
    )
}
