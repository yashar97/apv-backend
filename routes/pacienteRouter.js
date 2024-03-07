import { Router } from 'express';
import PacienteController from '../controllers/pacienteController.js';
import checkAuth from "../middlewares/authMiddleware.js";


const paciente = new PacienteController();
const router = Router();

router.post('/', checkAuth, paciente.agregarPaciente.bind(paciente));
router.put('/:id', checkAuth, paciente.actualizarPaciente.bind(paciente));
router.get('/', checkAuth, paciente.obtenerPacientes.bind(paciente));
router.delete('/:id', checkAuth, paciente.eliminarPaciente.bind(paciente));

export default router;