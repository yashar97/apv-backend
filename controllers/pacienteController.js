import pacienteModel from '../models/pacienteModel.js';

class PacienteController {
    constructor() {
        this.model = pacienteModel;
    }

    async obtenerPacientes(req, res) {

        try {

            const pacientes = await this.model.find({ veterinario: req.usuario._id });

            return res.json(pacientes);

        } catch (error) {
            return res.status(500).json({ msg: 'Error interno del servidor al obtener paciente' });
        }
    }

    async agregarPaciente(req, res) {

        const idVeterinario = req.usuario._id;

        const nuevoPaciente = req.body;

        nuevoPaciente.veterinario = idVeterinario;


        try {

            await this.model.create(nuevoPaciente);

            return res.status(201).json({ msg: 'Paciente agregado correctamente' });

        } catch (error) {
            return res.status(500).json({ msg: 'Error interno del servidor al agregar paciente' });

        }


    }

    async actualizarPaciente(req, res) {

        const id = req.params.id;

        const datosNuevos = req.body;

        try {

            const paciente = await this.model.findById(id);

            const pacienteActualizado = {
                nombre: datosNuevos.nombre || paciente.nombre,
                propietario: datosNuevos.propietario || paciente.propietario,
                email: datosNuevos.email || paciente.email,
                sintomas: datosNuevos.sintomas || paciente.sintomas,
            }

            await this.model.updateOne({ _id: id }, pacienteActualizado);

            return res.status(200).json({ msg: 'Paciente actualizado correctamente' });

        } catch (error) {
            return res.status(500).json({ msg: 'Error interno del servidor al actualizar paciente' });
        }

    }

    async eliminarPaciente(req, res) {

        const { id } = req.params;

        try {

            await this.model.deleteOne({ _id: id });

            return res.json({ msg: 'Paciente eliminado correctamente' });

        } catch (error) {
            return res.status(500).json({ msg: 'Error interno del servidor al eliminar al paciente' });
        }

    }



}

export default PacienteController;