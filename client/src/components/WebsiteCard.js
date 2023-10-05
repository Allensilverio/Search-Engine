import React from 'react'
import { useRandomLinkGenerator } from '../hooks/useGenerateRandomLinks';


export default function WebsiteCard() {
const { randomLinks, regenerateRandomLinks } = useRandomLinkGenerator(1); // Generar 10 enlaces iniciales
const handleGenerateLinks = () => {
  regenerateRandomLinks();
};

  return (
    <div>
      {randomLinks.map((link, index) => (
        <div key={index}>
        <div className='flex flex-row space-x-3 pl-0 '>
            <div className='bg-white w-[48px] h-[48px] rounded-3xl '></div>
            <div className='flex flex-col justify-left'>
                <h1 className='text-[14x] font-poppins font-regular text-white'>{link.title}</h1>
                <p className='text-[14px] text-white'> {link.url}</p>
            </div>
        </div>
        <div className='my-1'>
            <ul>
            <li>
            <h1 className='text-[15px] text-Rosado my-2 hover:underline hover:cursor-pointer' >{link.url2}</h1>
            </li>
            </ul>
            <p className='text-[12px] text-white'>{link.description}</p>
        </div>
        </div>
      ))}

    </div>
  )
}
