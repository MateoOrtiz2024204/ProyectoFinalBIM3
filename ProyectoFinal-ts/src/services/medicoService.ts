import { MedicoRepository } from "../repositories/medicoRepository";

export class MedicoService {

    private repo = new MedicoRepository();

    listar() {
        return this.repo.listar();
    }

    agregar(data: any) {
        if (!data.idEspecialidad || !data.nombre || !data.apellido || !data.telefono || !data.numeroColegiado) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.agregar({
            idLogin: data.idLogin ?? null,
            idEspecialidad: data.idEspecialidad,
            nombre: data.nombre,
            apellido: data.apellido,
            telefono: data.telefono,
            numeroColegiado: data.numeroColegiado
        });
    }

    actualizar(id: number, data: any) {
        if (!data.idEspecialidad || !data.nombre || !data.apellido || !data.telefono || !data.numeroColegiado) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.actualizar(id, {
            idEspecialidad: data.idEspecialidad,
            nombre: data.nombre,
            apellido: data.apellido,
            telefono: data.telefono,
            numeroColegiado: data.numeroColegiado
        });
    }

    eliminar(id: number) {
        return this.repo.eliminar(id);
    }

}
