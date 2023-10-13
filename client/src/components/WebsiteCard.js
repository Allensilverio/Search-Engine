import { useState } from 'react';


export default function WebsiteCard({Icon, Title, Url, Keywords, Description}) {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [startRowIndex, setStartRowIndex] = useState(0)
  const [maximumRows, setMaximumRows] = useState(10)
  const [searchResults, setSearchResults] = useState([]);
  //const searchResults = useWebSearch(searchTerm, 0, 10);


  // function handleSearch(event) {
  //   setSearchTerm(event.target.value);
  //   setStartRowIndex(0) // se establecen valores iniciales 
  //   setMaximumRows(10)

  // }

  // console.log(searchTerm, searchResults);


  return (
    <div>
        <div>
          <div className='flex flex-row space-x-3 pl-0 '>
            <div className='bg-white w-[48px] h-[48px] rounded-3xl'>
              <img src={Icon} alt='logo' className='w-[48px] h-[48px] rounded-3xl' />
            </div>
            <div className='flex flex-col justify-left'>
              <h1 className='text-[14px] font-poppins font-regular text-white'>{Title}</h1>
              <a
                href={Url} // Agregar la URL como valor del atributo "href"
                target="_blank" // Para abrir el enlace en una nueva pestaña
                rel="noopener noreferrer" // Buenas prácticas de seguridad
                className='text-[14px] text-white hover:underline' 
              >
                {Url}
              </a>              </div>
          </div>
          <div className='my-1'>
            <ul>
              <li>
                <h1 className='text-[15px] text-Rosado my-2 hover:underline hover:cursor-pointer'>{Keywords}</h1>
              </li>
            </ul>
            <p className='text-[12px] text-white'>{Description}</p>
          </div>
        </div>

    </div>
  )
}
