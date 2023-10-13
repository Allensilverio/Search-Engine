import Express from 'express';
import { connection } from './database/db.js';
import responseTime from 'response-time';
import getExpeditiousCache from 'express-expeditious';

const app = Express();
app.use(responseTime());

const cache = getExpeditiousCache({
  namespace: 'expresscache',
  defaultTtl: '5 minutes',
});

app.use(cache);

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
      setTimeout(() => {
        res.json(results[0]);
      }, 3000);
    }
  });
});

app.listen(3500, () => console.log('Server ready in port 3000!'));
