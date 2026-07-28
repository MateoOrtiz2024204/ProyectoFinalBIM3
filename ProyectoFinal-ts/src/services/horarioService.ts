import { HorarioRepository } from "../repositories/horarioRepository";

export class HorarioService {

    private repo = new HorarioRepository();

    listar() {
        return this.repo.listar();
    }

    buscarPorMedico(idMedico: number) {
        return this.repo.buscarPorMedico(idMedico);
    }

    agregar(data: any) {
        if (!data.idMedico || !data.diaSemana || !data.horaInicio || !data.horaFin) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.agregar({
            idMedico: data.idMedico,
            diaSemana: data.diaSemana,
            horaInicio: data.horaInicio,
            horaFin: data.horaFin
        });
    }

    actualizar(id: number, data: any) {
        if (!data.diaSemana || !data.horaInicio || !data.horaFin) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.actualizar(id, {
            diaSemana: data.diaSemana,
            horaInicio: data.horaInicio,
            horaFin: data.horaFin
        });
    }

    eliminar(id: number) {
        return this.repo.eliminar(id);
    }

}
