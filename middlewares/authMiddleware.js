import userModel from "../models/userModel.js";
import { verificarJWT } from '../helpers/generarJWT.js';

const checkAuth = async (req, res, next) => {

    if (req.headers.authorization) {

        const token = req.headers.authorization.split(' ')[1];

        try {

            const { id } = verificarJWT(token);

            const usuario = await userModel.findById(id).select('-password -__v');

            req.usuario = usuario;

            return next();

        } catch (error) {

            return res.status(409).json({ msg: 'No autenticado' });

        }

    }

    return res.status(409).json({ msg: 'No autenticado' });

}

export default checkAuth