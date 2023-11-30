import { connection } from '../bd.js';

export const metodoGet = (app, ruta) => {
  app.get(ruta, (req, res) => {
    // Obtener todos los usuarios desde la base de datos con el valor de acceso
    connection.query(
      'SELECT usuarios.*, accesos.Valor as AccesoValor FROM usuarios JOIN accesos ON usuarios.acceso_id = accesos.id_acceso',
      (error, results) => {
        if (error) throw error;
        // Verificar si hay usuarios
        if (results.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron usuarios.' });
        }
        res.json(results);
      }
    );
  });
};
