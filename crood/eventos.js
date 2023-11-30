// evento.js
import { connection } from '../bd.js';

export const Evento = (app, eve) => {

    app.post(eve, (req, res)  => {

    const { idUsuario } = req.params;

  // Obtén el valor de acceso_id de la tabla de usuarios
  connection.query('SELECT acceso_id FROM usuarios WHERE id_usuario = ?', [idUsuario], (error, results) => {
    if (error) {
      console.error('Error al obtener acceso_id:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const accesoId = results[0].acceso_id;

    // Inserta en la tabla de eventos con el valor de acceso_id obtenido
    connection.query('INSERT INTO eventos (usuario_id, fecha, acceso) VALUES (?, CURRENT_TIMESTAMP(), ?)', [idUsuario, accesoId], (error, results) => {
      if (error) {
        console.error('Error al insertar evento:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      return res.status(200).json({ mensaje: 'Evento insertado correctamente' });
    });
  });
});
}

