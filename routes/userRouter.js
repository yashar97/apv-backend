import { Router } from "express";
import UserController from "../controllers/userController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const user = new UserController();
const router = Router();


router.post('/register', user.register.bind(user));
router.post('/login', user.login.bind(user));

router.get('/perfil', checkAuth, user.perfil.bind(user));
router.post('/actualizar-informacion', checkAuth, user.actualizarInformacion.bind(user));

router.get('/confirmar-cuenta/:token', user.confirmarCuenta.bind(user));

router.post('/recuperar-password', user.recuperarPassword.bind(user));

router.get('/confirmar-token/:token', user.confirmarToken.bind(user));

router.post('/cambiar-password/:token', user.cambiarPassword.bind(user));


export default router;