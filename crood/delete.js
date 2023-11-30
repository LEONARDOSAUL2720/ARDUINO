import { connection } from '../bd.js';

export const metodoDelete = ( app,  ruta)=>{

    app.delete('/usuarios/:id', (req, res) => {
        // Eliminar un usuario por ID
        const usuarioId = req.params.id;
      
        // Obtener los detalles del usuario antes de eliminarlo
        connection.query('SELECT id_usuario, nombres FROM usuarios WHERE id_usuario = ?', usuarioId, (error, userDetails) => {
          if (error) {
            console.error('Error al obtener los detalles del usuario:', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor al obtener los detalles del usuario.' });
          }
      
          // Verificar si se encontró un usuario con el ID proporcionado
          if (userDetails.length === 0) {
            return res.status(404).json({ mensaje: `No se encontró ningún usuario con el ID ${usuarioId}.` });
          }
      
          // Eliminar el usuario ahora que tenemos sus detalles
          connection.query('DELETE FROM usuarios WHERE id_usuario = ?', usuarioId, (error, results) => {
            if (error) {
              console.error('Error al eliminar el usuario:', error);
              return res.status(500).json({ mensaje: 'Error interno del servidor al eliminar el usuario.' });
            }
      
            // Enviar la respuesta con los detalles del usuario eliminado
            //  res.json({ mensaje: `Usuario con ID ${usuarioId} y nombre (${userDetails[0].nombres}) eliminado` });
            return res.status(404).json({ mensaje:  `Usuario con ID ${usuarioId} y nombre (${userDetails[0].nombres}) eliminado`});
          });
        });
      });
    
}