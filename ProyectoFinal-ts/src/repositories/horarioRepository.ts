import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";

export class HorarioRepository {

    async listar(): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_ListarHorarios()");
        return rows[0];
    }

    async buscarPorMedico(idMedico: number): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_BuscarHorariosPorMedico(?)", [idMedico]);
        return rows[0];
    }

    async agregar(h: { idMedico: number; diaSemana: string; horaInicio: string; horaFin: string }): Promise<void> {
        await pool.query("CALL sp_AgregarHorario(?, ?, ?, ?)", [h.idMedico, h.diaSemana, h.horaInicio, h.horaFin]);
    }

    async actualizar(id: number, h: { diaSemana: string; horaInicio: string; horaFin: string }): Promise<void> {
        await pool.query("CALL sp_ActualizarHorario(?, ?, ?, ?)", [id, h.diaSemana, h.horaInicio, h.horaFin]);
    }

    async eliminar(id: number): Promise<void> {
        await pool.query("CALL sp_EliminarHorario(?)", [id]);
    }

}
