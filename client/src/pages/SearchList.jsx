import React, { useState, useEffect } from 'react';
import WebsiteCard from '../components/WebsiteCard';
import MyLoader from '../components/MyLoader';
import { useLocation } from 'react-router-dom';

export default function SearchList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [startRowIndex, setStartRowIndex] = useState(0);
  const [maximumRows, setMaximumRows] = useState(10);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga adicional de resultados
  const [hasMoreResults, setHasMoreResults] = useState(true); // Estado para controlar si hay más resultados
  const [searchResults, setSearchResults] = useState([]);
  // const searchResults = useWebSearch(searchTerm, startRowIndex, maximumRows);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get('query');



  // useEffect(() => {
  //   console.log(searchTerm, searchResults);
  // }, [searchResults]);

  useEffect(() => {
    // Función para cargar más resultados cuando el usuario llega al final de la lista
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100 &&
        hasMoreResults &&
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
  }, [startRowIndex, maximumRows, isLoading, hasMoreResults]);

  // Función para realizar una nueva búsqueda y cargar más resultados
  const loadMoreResults = async () => {
    setIsLoading(true); // Comienza la carga
    try {
      const response = await fetch(`/api/datos?criterio=${searchTerm}&startRowIndex=${startRowIndex}&maximumRows=${maximumRows}`);
      const data = await response.json();
      setSearchResults([...searchResults, ...data]); // Agrega los nuevos resultados a los resultados existentes
      setStartRowIndex(startRowIndex + maximumRows);
      if (data.length === 0) {
        setHasMoreResults(false); // Si no hay más resultados, desactiva la carga adicional
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  function handleSearch(event) {
    setSearchTerm(event.target.value);
    setStartRowIndex(0); // Reinicia el índice de inicio cuando se realiza una nueva búsqueda
    setMaximumRows(10); // Restablece la cantidad máxima de resultados por página

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

      try {
        // Fetch data based on the searchTerm
        const response = await fetch(`/api/datos?criterio=${searchTerm}&startRowIndex=${startRowIndex}&maximumRows=${maximumRows}`);
        const data = await response.json();
        // Update the state with the fetched data
        setSearchResults(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
  }

  const handleClearClick = () => {
    setSearchTerm(''); 
  };

  // Verifica si se deben mostrar el mensaje de carga adicional o los resultados
  const renderContent = () => {
    if (isLoading) {
      return <div> 
        <MyLoader/>
        <MyLoader/>
        <MyLoader/>

        </div>
    } else {
      return (
        <div>
          {searchResults.map((result, index) => (
            <WebsiteCard
              key={index}
              Title={result.Title}
              Url={result.Url}
              Keywords={result.Keywords}
              Description={result.Description}
              Icon={result.Icon}
            />
          ))}
          {hasMoreResults && (
            <button onClick={loadMoreResults}>
              <div> 
                <MyLoader/>
                <MyLoader/>
                <MyLoader/>

                </div>
            </button>
          )}
        </div>
      );
    }
  };

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
            <img
              src="/x-icon.svg"
              alt="x icono"
              onClick={handleClearClick}
              className="absolute flex items-center ml-[520px] pt-3"
            />

            <input
              type="text"
              onChange={handleSearch}
              className="bg-white/20 flex items-center justify-center px-3 py-2 rounded-2xl pr-96 pl-10 focus:outline-none text-white/70"
            />
          </div>
        </form>
      </div>
      <div className="w-full space-y-2">
        <hr className="border-white/10" />
        <p className="text-white/70 text-[14px]">Se han encontrado  {searchResults.length} resultados</p>
      </div>

      <div className="space-y-4 w-full max-h-[500px]">{renderContent()}</div>
    </div>
  );
}

