import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";

export class EspecialidadRepository {

    async listar(): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_ListarEspecialidades()");
        return rows[0];
    }

    async agregar(nombre: string, descripcion: string): Promise<void> {
        await pool.query("CALL sp_AgregarEspecialidad(?, ?)", [nombre, descripcion]);
    }

    async actualizar(id: number, nombre: string, descripcion: string): Promise<void> {
        await pool.query("CALL sp_ActualizarEspecialidad(?, ?, ?)", [id, nombre, descripcion]);
    }

    async eliminar(id: number): Promise<void> {
        await pool.query("CALL sp_EliminarEspecialidad(?)", [id]);
    }

}
