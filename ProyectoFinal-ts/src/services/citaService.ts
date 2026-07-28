import { CitaRepository } from "../repositories/citaRepository";

export class CitaService {

    private repo = new CitaRepository();

    listar() {
        return this.repo.listar();
    }

    buscarPorPaciente(idPaciente: number) {
        return this.repo.buscarPorPaciente(idPaciente);
    }

    agregar(data: any) {
        if (!data.idPaciente || !data.idMedico || !data.fecha || !data.hora || !data.motivo) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.agregar({
            idPaciente: data.idPaciente,
            idMedico: data.idMedico,
            fecha: data.fecha,
            hora: data.hora,
            motivo: data.motivo
        });
    }

    actualizar(id: number, data: any) {
        if (!data.fecha || !data.hora || !data.motivo || !data.estado) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.actualizar(id, {
            fecha: data.fecha,
            hora: data.hora,
            motivo: data.motivo,
            estado: data.estado
        });
    }

    actualizarEstado(id: number, estado: string) {
        if (!estado) throw new Error("El estado es requerido");
        return this.repo.actualizarEstado(id, estado);
    }

    eliminar(id: number) {
        return this.repo.eliminar(id);
    }

}
