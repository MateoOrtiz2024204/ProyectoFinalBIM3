import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";

export class PacienteRepository {

    async listar(): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_ListarPacientes()");
        return rows[0];
    }

    async buscarPorId(id: number): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_BuscarPacientePorId(?)", [id]);
        return rows[0];
    }

    async agregar(p: {
        idLogin: number | null; nombre: string; apellido: string; fechaNacimiento: string;
        genero: string; telefono: string; direccion: string; tipoSangre: string; alergias: string;
    }): Promise<void> {
        await pool.query("CALL sp_AgregarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            p.idLogin, p.nombre, p.apellido, p.fechaNacimiento, p.genero,
            p.telefono, p.direccion, p.tipoSangre, p.alergias
        ]);
    }

    async actualizar(id: number, p: {
        nombre: string; apellido: string; fechaNacimiento: string; genero: string;
        telefono: string; direccion: string; tipoSangre: string; alergias: string;
    }): Promise<void> {
        await pool.query("CALL sp_ActualizarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            id, p.nombre, p.apellido, p.fechaNacimiento, p.genero,
            p.telefono, p.direccion, p.tipoSangre, p.alergias
        ]);
    }

    async eliminar(id: number): Promise<void> {
        await pool.query("CALL sp_EliminarPaciente(?)", [id]);
    }

}
