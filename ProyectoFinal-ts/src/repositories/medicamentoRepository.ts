import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";

export class MedicamentoRepository {

    async listar(): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_ListarMedicamentos()");
        return rows[0];
    }

    async agregar(m: {
        nombre: string; presentacion: string; concentracion: string; laboratorio: string; requiereReceta: boolean;
    }): Promise<void> {
        await pool.query("CALL sp_AgregarMedicamento(?, ?, ?, ?, ?)", [
            m.nombre, m.presentacion, m.concentracion, m.laboratorio, m.requiereReceta
        ]);
    }

    async actualizar(id: number, m: {
        nombre: string; presentacion: string; concentracion: string; laboratorio: string; requiereReceta: boolean;
    }): Promise<void> {
        await pool.query("CALL sp_ActualizarMedicamento(?, ?, ?, ?, ?, ?)", [
            id, m.nombre, m.presentacion, m.concentracion, m.laboratorio, m.requiereReceta
        ]);
    }

    async eliminar(id: number): Promise<void> {
        await pool.query("CALL sp_EliminarMedicamento(?)", [id]);
    }

}
