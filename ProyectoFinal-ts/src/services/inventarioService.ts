import { InventarioRepository } from "../repositories/inventarioRepository";

export class InventarioService {

    private repo = new InventarioRepository();

    listar() {
        return this.repo.listar();
    }

    stockBajo() {
        return this.repo.stockBajo();
    }

    agregar(data: any) {
        if (!data.idMedicamento || data.cantidad === undefined || !data.fechaVencimiento) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.agregar({
            idMedicamento: data.idMedicamento,
            cantidad: data.cantidad,
            cantidadMinima: data.cantidadMinima ?? 10,
            fechaVencimiento: data.fechaVencimiento
        });
    }

    actualizar(id: number, data: any) {
        if (data.cantidad === undefined || !data.fechaVencimiento) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.actualizar(id, {
            cantidad: data.cantidad,
            cantidadMinima: data.cantidadMinima ?? 10,
            fechaVencimiento: data.fechaVencimiento
        });
    }

    actualizarStock(id: number, cantidad: number) {
        if (cantidad === undefined) throw new Error("La cantidad es requerida");
        return this.repo.actualizarStock(id, cantidad);
    }

    eliminar(id: number) {
        return this.repo.eliminar(id);
    }

}
