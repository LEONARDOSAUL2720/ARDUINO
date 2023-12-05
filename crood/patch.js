import { connection } from '../bd.js';

export const metodoPatch = (app, ruta) => {
    app.patch(ruta, (req, res) => {
        // Obtener los datos del nuevo usuario desde el cuerpo de la solicitud
        const { id_usuario, nombres, apellidos, puesto, rfid } = req.body;

        // Verificar si se proporcionó al menos uno de los parámetros para actualizar
        if (!nombres && !apellidos && !puesto && !rfid) {
            return res.status(400).json({ mensaje: 'Ningún parámetro proporcionado para actualizar.' });
        }

        // Obtener los datos existentes del usuario desde la base de datos
        connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario], (error, results) => {
            if (error) {
                console.error(`Error al obtener los datos del usuario con id ${id_usuario}:`, error);
                return res.status(500).json({ mensaje: 'Error interno del servidor al obtener los datos del usuario.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
            }

            const usuarioExistente = results[0];

            // Fusionar los datos existentes con los nuevos datos proporcionados
            const nuevoUsuario = {
                nombres: nombres || usuarioExistente.nombres,
                apellidos: apellidos || usuarioExistente.apellidos,
                puesto: puesto || usuarioExistente.puesto,
                rfid: rfid || usuarioExistente.rfid,
            };

            // Insertar el usuario actualizado en la base de datos
            connection.query('UPDATE usuarios SET ? WHERE id_usuario = ?', [nuevoUsuario, id_usuario], (error, results) => {
                if (error) {
                    console.error(`Error al actualizar el usuario con id ${id_usuario}:`, error);
                    return res.status(500).json({ mensaje: 'Error interno del servidor al actualizar el usuario.' });
                }

                // Obtener la lista completa de usuarios después de la actualización exitosa
                connection.query('SELECT * FROM usuarios', (error, results) => {
                    if (error) {
                        console.error('Error al obtener la lista completa de usuarios:', error);
                        return res.status(500).json({ mensaje: 'Error interno del servidor al obtener la lista completa de usuarios.' });
                    }

                    // Enviar la respuesta con los detalles del usuario actualizado y la lista completa
                    res.status(200).json({ id: id_usuario, ...nuevoUsuario, todosLosUsuarios: results });
                });
            });
        });
    });
};
