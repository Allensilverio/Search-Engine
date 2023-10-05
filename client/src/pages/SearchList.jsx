import React from 'react'
import WebsiteCard from '../components/WebsiteCard'
import { useRandomLinkGenerator } from '../hooks/useGenerateRandomLinks'; 


export default function SearchList() {
    const { randomLinks } = useRandomLinkGenerator(20);


    return (
        <div className=' flex flex-col items-center rounded-3xl bg-gradient-to-b from-white/20 backdrop-blur-lg drop-shadow-xl border-[0.5px] border-white/10 space-y-16 my-auto py-10 pl-32 pr-96'>
            <div className='flex flex-row items-center justify-center w-11/12 space-x-20'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <img src='/logo.png' alt='logo icono' className='w-[48px]'></img>
                    <h1 className='text-[30px] text-white font-bold'>Seekster</h1>
                </div>

                <form>
                    <div className='relative'>
                        <img
                            src='/search-icon-color.svg'
                            alt='busqueda icono'
                            className='absolute flex items-center ml-[550px] pt-3'
                        />
                        <img
                            src='/x-icon.svg'
                            alt='busqueda icono'
                            className='absolute flex items-center ml-[520px] pt-3'
                        />


                        <input
                            type='text'
                            className='bg-white/20 flex items-center justify-center px-3 py-2 rounded-2xl pr-96 pl-10 focus:outline-none text-white/70'
                        />
                    </div>
                </form>
            </div>
            <div className='w-full space-y-2'>
                <hr className=' border-white/10' />
                <p className='text-white/70 text-[14px]'>Se han encontrado {randomLinks.length} resultados</p>

            </div>


            <div className='space-y-4 mt-8 pl-0 w-full max-h-[500px]'>
            {randomLinks.map((link, index) => (
          <WebsiteCard
            key={index}
            title={link.title}
            url={link.url}
            url2 = {link.url2}
            description={link.description}
          />
        ))}
            </div>
        </div>
    )
}

