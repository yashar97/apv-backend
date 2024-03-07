import uuid4 from "uuid4";
import userModel from '../models/userModel.js'
import { hashPassword, checkPassword } from '../helpers/bcrypt.js'
import { generarJWT } from '../helpers/generarJWT.js';
import enviarEmail from '../helpers/enviarEmail.js';
import { emailRecuperarPassword } from '../helpers/enviarEmail.js';

class UserController {
    constructor() {
        this.model = userModel;
    }

    async register(req, res) {

        const nuevoUsuario = req.body;

        try {

            const existe = await this.model.findOne({ email: nuevoUsuario.email });

            if (existe) {
                return res.status(409).json({ msg: 'El email ya está registrado' });
            }

            nuevoUsuario.password = hashPassword(nuevoUsuario.password);
            nuevoUsuario.token = uuid4();

            await this.model.create(nuevoUsuario);

            await enviarEmail(nuevoUsuario);

            return res.status(201).json({ msg: 'Registro exitoso' });

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ msg: 'Ocurrió un error inesperado' });
        }
    }

    async login(req, res) {

        const { email, password } = req.body;

        try {

            const existe = await this.model.findOne({ email });

            if (!existe) {
                return res.status(404).json({ msg: 'El email no está registrado' });
            }

            if (!checkPassword(password, existe.password)) {
                return res.status(400).json({ msg: 'Contraseña incorrecta' });
            }


            const usuarioAutenticado = {
                _id: existe._id,
                nombre: existe.nombre,
                apellido: existe.apellido,
                email: existe.email,
                confirmado: existe.confirmado,
                token: generarJWT(existe._id)
            }

            return res.json(usuarioAutenticado);

        } catch (error) {
            return res.status(500).json({ msg: 'Ocurrió un error inesperado' })
        }

    }

    async perfil(req, res) {

        const usuarioAutenticado = req.usuario;

        return res.json(usuarioAutenticado);
    }

    async actualizarInformacion(req, res) {

        const datos = req.body;

        const id = req.usuario.id;

        try {

            const usuarioActaulizar = await this.model.findById(id);

            const usuarioActaulizado = {
                nombre: datos.nombre || usuarioActaulizar.nombre,
                apellido: datos.apellido || usuarioActaulizar.apellido,
                email: datos.email || usuarioActaulizar.email,
            }

            if(datos.password) {
                usuarioActaulizado.password = hashPassword(datos.password);
            }

            await this.model.updateOne({ _id: id }, usuarioActaulizado);

            return res.json({ msg: 'Información actualizada correctamente' });
        } catch (error) {
            return res.status(500).json({ msg: 'Ocurrió un error' });
        }

    }

    async confirmarCuenta(req, res) {

        const { token } = req.params;

        try {

            const usuarioConfirmar = await this.model.findOne({ token });

            if (!usuarioConfirmar) {
                return res.status(404).json({ msg: 'No encontrado' });
            }

            usuarioConfirmar.confirmado = true;

            usuarioConfirmar.token = null;

            await usuarioConfirmar.save();


            return res.json({ msg: 'Cuenta confirmada correctamente' });

        } catch (error) {
            console.log(error);
        }



    }

    async recuperarPassword(req, res) {

        const { email } = req.body;

        console.log(email)

        try {

            const existeEmail = await this.model.findOne({ email });

            if (!existeEmail) {
                return res.status(404).json({ msg: 'El email ingresado no se encuentra registrado' });
            }

            existeEmail.token = uuid4();

            await existeEmail.save();

            await emailRecuperarPassword({ nombre: existeEmail.nombre, token: existeEmail.token, email });

            return res.json({ msg: 'Se envió un email con las instrucciones' });

        } catch (error) {
            console.log(error);
        }
    }

    async confirmarToken(req, res) {

        const { token } = req.params;

        try {

            const respuesta = await this.model.findOne({ token });

            if (respuesta.nombre) {
                return res.json({ status: true })
            } else {
                return res.status(404).json({ msg: 'No se encontró' });
            }

        } catch (error) {
            return res.status(500).json({ msg: 'Ocurrió un error' });
        }
    }

    async cambiarPassword(req, res) {

        const { password } = req.body;
        const { token } = req.params;

        try {

            const usuario = await this.model.findOne({ token });

            usuario.password = hashPassword(password);
            usuario.token = null;

            await usuario.save();

            return res.json({ msg: 'Contraseña actualizada correctamente' });

        } catch (error) {
            console.log(error);
        }

    }
}

export default UserController;