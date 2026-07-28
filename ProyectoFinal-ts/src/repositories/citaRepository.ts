import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";

export class CitaRepository {

    async listar(): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_ListarCitas()");
        return rows[0];
    }

    async buscarPorPaciente(idPaciente: number): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_BuscarCitasPorPaciente(?)", [idPaciente]);
        return rows[0];
    }

    async agregar(c: { idPaciente: number; idMedico: number; fecha: string; hora: string; motivo: string }): Promise<void> {
        await pool.query("CALL sp_AgregarCita(?, ?, ?, ?, ?)", [c.idPaciente, c.idMedico, c.fecha, c.hora, c.motivo]);
    }

    async actualizar(id: number, c: { fecha: string; hora: string; motivo: string; estado: string }): Promise<void> {
        await pool.query("CALL sp_ActualizarCita(?, ?, ?, ?, ?)", [id, c.fecha, c.hora, c.motivo, c.estado]);
    }

    async actualizarEstado(id: number, estado: string): Promise<void> {
        await pool.query("CALL sp_ActualizarEstadoCita(?, ?)", [id, estado]);
    }

    async eliminar(id: number): Promise<void> {
        await pool.query("CALL sp_EliminarCita(?)", [id]);
    }

}
