import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";

export class LoginRepository {

    async validar(correo: string, contrasena: string): Promise<RowDataPacket[]> {
        const [rows]: any = await pool.query("CALL sp_ValidarLogin(?, ?)", [correo, contrasena]);
        return rows[0];
    }

}
