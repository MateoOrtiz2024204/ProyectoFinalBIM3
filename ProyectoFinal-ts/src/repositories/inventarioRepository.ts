import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";

export class InventarioRepository {

    async listar(): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_ListarInventario()");
        return rows[0];
    }

    async stockBajo(): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_VerificarStockBajo()");
        return rows[0];
    }

    async agregar(i: { idMedicamento: number; cantidad: number; cantidadMinima: number; fechaVencimiento: string }): Promise<void> {
        await pool.query("CALL sp_AgregarInventario(?, ?, ?, ?)", [
            i.idMedicamento, i.cantidad, i.cantidadMinima, i.fechaVencimiento
        ]);
    }

    async actualizar(id: number, i: { cantidad: number; cantidadMinima: number; fechaVencimiento: string }): Promise<void> {
        await pool.query("CALL sp_ActualizarInventario(?, ?, ?, ?)", [id, i.cantidad, i.cantidadMinima, i.fechaVencimiento]);
    }

    async actualizarStock(id: number, cantidad: number): Promise<void> {
        await pool.query("CALL sp_ActualizarStock(?, ?)", [id, cantidad]);
    }

    async eliminar(id: number): Promise<void> {
        await pool.query("CALL sp_EliminarInventario(?)", [id]);
    }

}
