import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";

export class MedicoRepository {

    async listar(): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_ListarMedicos()");
        return rows[0];
    }

    async agregar(m: {
        idLogin: number | null; idEspecialidad: number; nombre: string; apellido: string;
        telefono: string; numeroColegiado: string;
    }): Promise<void> {
        await pool.query("CALL sp_AgregarMedico(?, ?, ?, ?, ?, ?)", [
            m.idLogin, m.idEspecialidad, m.nombre, m.apellido, m.telefono, m.numeroColegiado
        ]);
    }

    async actualizar(id: number, m: {
        idEspecialidad: number; nombre: string; apellido: string; telefono: string; numeroColegiado: string;
    }): Promise<void> {
        await pool.query("CALL sp_ActualizarMedico(?, ?, ?, ?, ?, ?)", [
            id, m.idEspecialidad, m.nombre, m.apellido, m.telefono, m.numeroColegiado
        ]);
    }

    async eliminar(id: number): Promise<void> {
        await pool.query("CALL sp_EliminarMedico(?)", [id]);
    }

}
