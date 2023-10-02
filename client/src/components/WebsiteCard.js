import React from 'react'

export default function WebsiteCard() {
  return (
    <div>
        
        <div className='flex flex-row space-x-3 '>
            <div className='bg-white w-[48px] h-[48px] rounded-3xl '></div>
            <div className='flex flex-col justify-left'>
                <h1 className='text-[14x] font-poppins font-regular text-white'>La pagina</h1>
                <p className='text-[14px] text-white'> https://www.hola.com/</p>
            </div>
        </div>
        <div className='my-1'>
            <ul>
            <li>
            <h1 className='text-[15px] text-Rosado my-2 hover:underline hover:cursor-pointer' >HOLA.com, diario de actualidad, moda y belleza</h1>
            </li>
            </ul>

            <p className='text-[12px] text-white'>Número 1 en actualidad y tendencias de moda, belleza y estilo de vida.  Noticias diarias sobre las estrellas de cine, la música, tendencias de moda, ...</p>

        </div>
    </div>
  )
}
