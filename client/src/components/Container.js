import { UserButton } from '@clerk/clerk-react';
import React, { useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { Link, useNavigate } from 'react-router-dom';
import SearchListFinal from '../pages/SearchListFinal';

export default function Container() {
    const [searchTerm, setSearchTerm] = useState('');
    const [newSearchTerm, setNewSearchTerm] = useState('');
    const [startRowIndex, setStartRowIndex] = useState(0);
    const [maximumRows, setMaximumRows] = useState(10);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    function handleSearch(event) {
        const newSearchTerm = event.target.value;
        setNewSearchTerm(event.target.value);
        setNewSearchTerm(newSearchTerm);
        setStartRowIndex(0); // Reinicia el índice de inicio cuando se realiza una nueva búsqueda
        setMaximumRows(10); // Restablece la cantidad máxima de resultados por página
    
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            navigate(`/searchlistfinal?criterio=${newSearchTerm}`);
            console.log(newSearchTerm);
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
        <UserButton/>
            <Tilt>

                <div className=' w-[1130px] h-[500px] flex items-center justify-center bg-gradient-to-b from-white/20 rounded-3xl m-20 border-[0.5px] border-white/10 backdrop-blur-sm drop-shadow-xl p-20'>
                    <div>
                        <div className='flex flex-row items-center'>
                            <img src='/logo.png' alt='logo icono' className=''></img>
                            <h1 className='text-[64px] text-center font-poppins font-bold text-white'>Seekster</h1>
                        </div>
                        <div className='flex flex-col justify-center' >
                            <form onSubmit={handleSubmit}>
                                <div className='absolute'>
                                    <Link to={`/searchlistfinal?query=${newSearchTerm}`} className="text-white/70">
                                        <div className='relative'>
                                            <img src='/search-icon.svg' alt='busqueda icono' className='absolute flex items-center ml-3 pt-3' />
                                        </div>
                                        <input
                                            type='text'
                                            placeholder='Buscar en la web'
                                            className='bg-white/20 flex items-center justify-center px-3 py-2 rounded-2xl pr-72 pl-10 focus:outline-none text-white/70'
                                            value={newSearchTerm}
                                            onChange={handleSearch}
                                            onClick={(e) => e.preventDefault()} // Esto desactiva la acción predeterminada del enlace

                                        />
                                    </Link>
                                </div>

                            </form>
                        </div>

                    </div>

                </div>

            </Tilt>
        </>

    )
}
