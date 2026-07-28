import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";

export class RecetaRepository {

    async listar(): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_ListarRecetas()");
        return rows[0];
    }

    async agregar(r: {
        idHistorial: number; idMedico: number; idPaciente: number; idInventario: number;
        dosis: string; duracionDias: number; cantidad: number;
    }): Promise<void> {
        await pool.query("CALL sp_AgregarReceta(?, ?, ?, ?, ?, ?, ?)", [
            r.idHistorial, r.idMedico, r.idPaciente, r.idInventario, r.dosis, r.duracionDias, r.cantidad
        ]);
    }

    async actualizarEstado(id: number, estado: string): Promise<void> {
        await pool.query("CALL sp_ActualizarEstadoReceta(?, ?)", [id, estado]);
    }

}
