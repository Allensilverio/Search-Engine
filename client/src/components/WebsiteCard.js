import { useState } from 'react';
import useWebSearch from '../hooks/useWebSearch';

export default function WebsiteCard() {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [startRowIndex, setStartRowIndex] = useState(0)
  const [maximumRows, setMaximumRows] = useState(10)
  const searchResults = useWebSearch(searchTerm, 0, 10);


  function handleSearch(event) {
    setSearchTerm(event.target.value);
    setStartRowIndex(0) // se establecen valores iniciales 
    setMaximumRows(10)
  
  }

  console.log("searchResults in WebsiteCard:", searchResults);


    return (
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            <div className='flex flex-row space-x-3 pl-0 '>
              <div className='bg-white w-[48px] h-[48px] rounded-3xl'>
                <img src={result.Icon} alt='logo' className='w-[48px] h-[48px] rounded-3xl' />
              </div>
              <div className='flex flex-col justify-left'>
                <h1 className='text-[14px] font-poppins font-regular text-white'>{result.Title}</h1>
                <p className='text-[14px] text-white'> {result.Url}</p>
              </div>
            </div>
            <div className='my-1'>
              <ul>
                <li>
                  <h1 className='text-[15px] text-Rosado my-2 hover:underline hover:cursor-pointer'>{result.Keywords}</h1>
                </li>
              </ul>
              <p className='text-[12px] text-white'>{result.Description}</p>
            </div>
          </div>
        ))}

      </div>
    )
  }
