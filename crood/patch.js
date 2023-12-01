import { connection } from '../bd.js';

export const metodoPatch = (app, ruta)=>{
    app.patch(ruta, (req, res) => {
        // Obtener los datos del nuevo usuario desde el cuerpo de la solicitud
        const { id_usuario, nombres, apellidos, puesto } = req.body;
      
        const puestoInt = parseInt(puesto, 10);
         let acceso_id;

        switch (puestoInt) {
          case 1:
            acceso_id = 1;
            break;
          case 2:
            acceso_id = 2;
            break;
          default:
            acceso_id = 0;
            break;
        }
        // Crear un objeto con los datos del nuevo usuario
        const nuevoUsuario = { nombres, apellidos, puesto, acceso_id };
      
        // Insertar el nuevo usuario en la base de datos
        connection.query('UPDATE usuarios SET ? where id_usuario= ?', [nuevoUsuario, id_usuario],  (error, results) => {
          if (error) {
            console.error(`Error al actualizar el usuario: ${nuevoUsuario.nombres}`, error);
            return res.status(500).json({ mensaje: 'Error interno del servidor al actualizar el usuario.' });
          }
      
          // Obtener la lista completa de usuarios después de la inserción exitosa
          connection.query('SELECT * FROM usuarios', (error, results) => {
            if (error) {
              console.error('Error al obtener la lista completa de usuarios:', error);
              return res.status(500).json({ mensaje: 'Error interno del servidor al obtener la lista completa de usuarios.' });
            }
      
            // Enviar la respuesta con los detalles del nuevo usuario y la lista completa
            res.status(201).json({ id: results.insertId, ...nuevoUsuario, todosLosUsuarios: results });
          });
        });
      });
      
}