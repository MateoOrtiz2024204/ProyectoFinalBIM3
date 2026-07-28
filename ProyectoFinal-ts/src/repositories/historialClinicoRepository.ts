import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";

export class HistorialClinicoRepository {

    async listar(): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_ListarHistoriales()");
        return rows[0];
    }

    async buscarPorPaciente(idPaciente: number): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_BuscarHistorialPorPaciente(?)", [idPaciente]);
        return rows[0];
    }

    async agregar(h: {
        idPaciente: number; idMedico: number | null; diagnostico: string;
        tratamiento: string; medicamentos: string; observaciones: string;
    }): Promise<void> {
        await pool.query("CALL sp_AgregarHistorial(?, ?, ?, ?, ?, ?)", [
            h.idPaciente, h.idMedico, h.diagnostico, h.tratamiento, h.medicamentos, h.observaciones
        ]);
    }

}
