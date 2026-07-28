import { MedicamentoRepository } from "../repositories/medicamentoRepository";

export class MedicamentoService {

    private repo = new MedicamentoRepository();

    listar() {
        return this.repo.listar();
    }

    agregar(data: any) {
        if (!data.nombre) throw new Error("El nombre es requerido");
        return this.repo.agregar({
            nombre: data.nombre,
            presentacion: data.presentacion ?? "",
            concentracion: data.concentracion ?? "",
            laboratorio: data.laboratorio ?? "",
            requiereReceta: !!data.requiereReceta
        });
    }

    actualizar(id: number, data: any) {
        if (!data.nombre) throw new Error("El nombre es requerido");
        return this.repo.actualizar(id, {
            nombre: data.nombre,
            presentacion: data.presentacion ?? "",
            concentracion: data.concentracion ?? "",
            laboratorio: data.laboratorio ?? "",
            requiereReceta: !!data.requiereReceta
        });
    }

    eliminar(id: number) {
        return this.repo.eliminar(id);
    }

}
