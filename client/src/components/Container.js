import React, { useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { Link } from 'react-router-dom';

export default function Container() {
    const [searchTerm, setSearchTerm] = useState('');
    function handleSearch(event) {
        setSearchTerm(event.target.value);
      }


    return (
        <Tilt>

            <div className=' w-[1130px] h-[500px] flex items-center justify-center bg-gradient-to-b from-white/20 rounded-3xl m-20 border-[0.5px] border-white/10 backdrop-blur-sm drop-shadow-xl p-20'>
                <div>
                    <div className='flex flex-row items-center'>
                        <img src='/logo.png' alt='logo icono' className=''></img>
                        <h1 className='text-[64px] text-center font-poppins font-bold text-white'>Seekster</h1>
                    </div>
                    <div className='flex flex-col justify-center' >
                        <form> 
                            <div className='absolute'>
                                <Link to={`/searchlist?query=${searchTerm}`} className="text-white/70">
                                    <div className='relative'>
                                        <img src='/search-icon.svg' alt='busqueda icono' className='absolute flex items-center ml-3 pt-3' />
                                    </div>
                                    <input
                                        type='text'
                                        placeholder='Buscar en la web'
                                        className='bg-white/20 flex items-center justify-center px-3 py-2 rounded-2xl pr-72 pl-10 focus:outline-none text-white/70'
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </Link>
                            </div>

                        </form>
                    </div>

                </div>

            </div>

        </Tilt>
    )
}
