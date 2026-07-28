# Proyecto Final - Sistema de Gestion Hospitalaria
 
## Objetivo
Implementar un servidor HTTP nativo con Node.js, sin utilizar Express, que exponga un CRUD por cada entidad del sistema hospitalario (pacientes, medicos, citas, etc.), respondiendo en formato JSON, validando la informacion recibida y persistiendo los datos en una base de datos MySQL mediante stored procedures.
 
## Tecnologias utilizadas
- Node.js
- TypeScript
- Modulo nativo `http`
- MySQL (`mysql2`)
- tsx (para ejecutar TypeScript directamente)
- Arquitectura en capas: repository, service, controller, routes
## Instalacion
```
pnpm install
```
Ejecutar el script `BDgestionHospitalaria_in5cm.sql` en MySQL y configurar las credenciales en `.env`.
 
## Ejecucion
```
pnpm run dev
```
El servidor queda disponible en: `http://localhost:3000`
 
## Rutas disponibles
 
### Pacientes
| Metodo |       Ruta         | Descripcion  |
|--------|--------------------|--------------|
| GET    | /api/pacientes     | Listar todos |
| GET    | /api/pacientes/:id | Buscar uno   |
| POST   | /api/pacientes     | Agregar      |
| PUT    | /api/pacientes/:id | Actualizar   |
| DELETE | /api/pacientes/:id | Eliminar     |
 
### Especialidades
| Metodo |          Ruta           | Descripcion  |
|--------|-------------------------|--------------|
| GET    | /api/especialidades     | Listar todos |
| POST   | /api/especialidades     | Agregar      |
| PUT    | /api/especialidades/:id | Actualizar   |
| DELETE | /api/especialidades/:id | Eliminar     |
 
### Medicos
| Método | Ruta              | Descripción  |
|--------|-------------------|--------------|
| GET    | /api/medicos      | Listar todos |
| POST   | /api/medicos      | Agregar      |
| PUT    | /api/medicos/:id  | Actualizar   |
| DELETE | /api/medicos/:id  | Eliminar     |

### Horarios
| Método | Ruta                            | Descripción        |
|--------|---------------------------------|--------------------|
| GET    | /api/horarios                   | Listar todos       |
| GET    | /api/horarios/medico/:idMedico  | Listar por medico  |
| POST   | /api/horarios                   | Agregar            |
| PUT    | /api/horarios/:id               | Actualizar         |
| DELETE | /api/horarios/:id               | Eliminar           |

### Citas
| Método | Ruta                              | Descripción         |
|--------|-----------------------------------|---------------------|
| GET    | /api/citas                        | Listar todas        |
| GET    | /api/citas/paciente/:idPaciente   | Listar por paciente |
| POST   | /api/citas                        | Agregar             |
| PUT    | /api/citas/:id                    | Actualizar          |
| PATCH  | /api/citas/:id/estado             | Cambiar estado      |
| DELETE | /api/citas/:id                    | Eliminar            |

### Historiales clínicos
| Método | Ruta                                       | Descripción         |
|--------|--------------------------------------------|---------------------|
| GET    | /api/historiales                           | Listar todos        |
| GET    | /api/historiales/paciente/:idPaciente      | Listar por paciente |
| POST   | /api/historiales                           | Agregar             |

### Medicamentos
| Método | Ruta                    | Descripción  |
|--------|-------------------------|--------------|
| GET    | /api/medicamentos       | Listar todos |
| POST   | /api/medicamentos       | Agregar      |
| PUT    | /api/medicamentos/:id   | Actualizar   |
| DELETE | /api/medicamentos/:id   | Eliminar     |

### Inventario
| Método | Ruta                            | Descripción       |
|--------|---------------------------------|-------------------|
| GET    | /api/inventario                 | Listar todo       |
| GET    | /api/inventario/stock-bajo      | Listar stock bajo |
| POST   | /api/inventario                 | Agregar           |
| PUT    | /api/inventario/:id             | Actualizar        |
| PATCH  | /api/inventario/:id/stock       | Ajustar stock     |
| DELETE | /api/inventario/:id             | Eliminar          |

### Recetas
| Método | Ruta                        | Descripción    |
|--------|-----------------------------|----------------|
| GET    | /api/recetas                | Listar todas   |
| POST   | /api/recetas                | Agregar        |
| PATCH  | /api/recetas/:id/estado     | Cambiar estado |

### Login
| Método | Ruta        | Descripción            |
|--------|-------------|------------------------|
| POST   | /api/login  | Validar credenciales   |
 
## Validaciones
Cada entidad valida sus campos obligatorios antes de guardar (ej. pacientes: nombre, apellido, fecha de nacimiento, genero y telefono no pueden ir vacios; citas: paciente, medico, fecha, hora y motivo son requeridos). Ver el manual de usuario para el detalle completo por entidad.
 
## Manejo de errores
El servidor responde con el codigo y mensaje adecuado en los siguientes casos: ruta inexistente (404), metodo no permitido (405), recurso inexistente (404), campos requeridos faltantes (400) y JSON invalido en el cuerpo de la peticion (400).