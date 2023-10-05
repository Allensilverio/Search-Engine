import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useWebSearch(query, pageNumber) { //query es cualquier cosa que se escriba en el buscador
  useEffect(() => {
    axios({
        method: 'GET',
        // API URL Y PARAMETROS DE LA API
    }).then(res => {
        console.log(res.data)
    })

  }, [query, pageNumber]) //cada vez que cambie la query o el numero de pagina, se ejecuta el useEffect
    return (
    <div>useWebSearch</div>
  )
}
