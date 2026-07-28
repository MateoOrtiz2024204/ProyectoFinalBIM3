import { EspecialidadRepository } from "../repositories/especialidadRepository";

export class EspecialidadService {

    private repo = new EspecialidadRepository();

    listar() {
        return this.repo.listar();
    }

    agregar(data: any) {
        if (!data.nombre) throw new Error("El nombre es requerido");
        return this.repo.agregar(data.nombre, data.descripcion ?? "");
    }

    actualizar(id: number, data: any) {
        if (!data.nombre) throw new Error("El nombre es requerido");
        return this.repo.actualizar(id, data.nombre, data.descripcion ?? "");
    }

    eliminar(id: number) {
        return this.repo.eliminar(id);
    }

}
