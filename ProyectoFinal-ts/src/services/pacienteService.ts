import { PacienteRepository } from "../repositories/pacienteRepository";

export class PacienteService {

    private repo = new PacienteRepository();

    listar() {
        return this.repo.listar();
    }

    async buscarPorId(id: number) {
        const resultado = await this.repo.buscarPorId(id);
        if (!resultado || resultado.length === 0) throw new Error("Paciente no encontrado");
        return resultado[0];
    }

    agregar(data: any) {
        if (!data.nombre || !data.apellido || !data.fechaNacimiento || !data.genero || !data.telefono) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.agregar({
            idLogin: data.idLogin ?? null,
            nombre: data.nombre,
            apellido: data.apellido,
            fechaNacimiento: data.fechaNacimiento,
            genero: data.genero,
            telefono: data.telefono,
            direccion: data.direccion ?? "",
            tipoSangre: data.tipoSangre ?? "",
            alergias: data.alergias ?? ""
        });
    }

    actualizar(id: number, data: any) {
        if (!data.nombre || !data.apellido || !data.fechaNacimiento || !data.genero || !data.telefono) {
            throw new Error("Faltan campos requeridos");
        }
        return this.repo.actualizar(id, {
            nombre: data.nombre,
            apellido: data.apellido,
            fechaNacimiento: data.fechaNacimiento,
            genero: data.genero,
            telefono: data.telefono,
            direccion: data.direccion ?? "",
            tipoSangre: data.tipoSangre ?? "",
            alergias: data.alergias ?? ""
        });
    }

    eliminar(id: number) {
        return this.repo.eliminar(id);
    }

}
