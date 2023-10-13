import axios from 'axios'
import Express from 'express';
import getMetaData from 'metadata-scraper';
import { connection } from './database/db.js';

const app = Express();

app.get('/api/datos', (req, res) => {
    // Obtiene los valores de los parámetros de consulta desde la URL
    const criterio = req.query.criterio;
    const startRowIndex = req.query.startRowIndex;
    const maximumRows = req.query.maximumRows;
    console.log(req.query.criterio);
    console.log(req.query.startRowIndex);
    console.log(req.query.maximumRows);



    // Verifica si se proporcionaron los tres valores en la consulta
    // if (!criterio || !startRowIndex || !maximumRows) {
    //   res.status(400).json({ error: 'Se requieren tres valores para la búsqueda' });
    //   return;
    // }
  
    // Llama al stored procedure con los tres valores proporcionados
    connection.query('CALL spSearchPage(?, ?, ?)', [criterio, startRowIndex, maximumRows], (err, results) => {
      if (err) {
        console.error('Error al ejecutar el stored procedure: ' + err.message);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        // Los resultados del stored procedure se encuentran en results[0]
        res.json(results[0]);
      }
    });
  });
  
app.listen(3500, () => console.log('Server ready in port 3000!'));
