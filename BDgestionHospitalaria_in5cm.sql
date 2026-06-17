drop database if exists DBgestionHospitalaria_in5cm;
create database DBgestionHospitalaria_in5cm;
use DBgestionHospitalaria_in5cm;

-- /////ENTIDADES///// --

create table Login (
    id_login int auto_increment not null,
    correo_login varchar(50) not null unique,
    usuario_login varchar(30) not null unique,
    contrasena_login varchar(100) not null,
    roles enum('Administrador','Medico','Enfermero','Paciente') not null,
    estado_login tinyint(1) default 1,
    primary key (id_login)
);

create table Pacientes (
    id_paciente int auto_increment not null,
    id_login int,
    nombre_paciente varchar(50) not null,
    apellido_paciente varchar(50) not null,
    fecha_nacimiento date not null,
    genero enum('Masculino','Femenino','Otro') not null,
    telefono varchar(15) not null,
    direccion varchar(100),
    tipo_sangre varchar(5),
    alergias text,
    estado_paciente tinyint(1) default 1,
    primary key (id_paciente),
    constraint FK_paciente_login foreign key (id_login)
        references Login(id_login) on delete set null
);

create table Especialidades (
    id_especialidad int auto_increment not null,
    nombre_especialidad varchar(50) not null unique,
    descripcion text,
    estado_especialidad tinyint(1) default 1,
    primary key (id_especialidad)
);

create table Medicos (
    id_medico int auto_increment not null,
    id_login int,
    id_especialidad int,
    nombre_medico varchar(50) not null,
    apellido_medico varchar(50) not null,
    telefono varchar(15) not null,
    numero_colegiado varchar(30) not null unique,
    estado_medico tinyint(1) default 1,
    primary key (id_medico),
    constraint FK_medico_login foreign key (id_login)
        references Login(id_login) on delete set null,
    constraint FK_medico_especialidad foreign key (id_especialidad)
        references Especialidades(id_especialidad) on delete set null
);

create table Horarios (
    id_horario int auto_increment not null,
    id_medico int not null,
    dia_semana enum('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo') not null,
    hora_inicio time not null,
    hora_fin time not null,
    estado_horario tinyint(1) default 1,
    primary key (id_horario),
    constraint FK_horario_medico foreign key (id_medico)
        references Medicos(id_medico) on delete cascade
);

create table Citas (
    id_cita int auto_increment not null,
    id_paciente int not null,
    id_medico int not null,
    fecha_cita date not null,
    hora_cita time not null,
    motivo text not null,
    estado_cita enum('Pendiente','Confirmada','Atendida','Cancelada') default 'Pendiente',
    primary key (id_cita),
    constraint FK_cita_paciente foreign key (id_paciente)
        references Pacientes(id_paciente) on delete cascade,
    constraint FK_cita_medico foreign key (id_medico)
        references Medicos(id_medico) on delete cascade
);

create table HistorialClinico (
    id_historial int auto_increment not null,
    id_paciente int not null,
    id_medico int,
    fecha_visita datetime default current_timestamp,
    diagnostico text not null,
    tratamiento text,
    medicamentos text,
    observaciones text,
    primary key (id_historial),
    constraint FK_historial_paciente foreign key (id_paciente)
        references Pacientes(id_paciente) on delete cascade,
    constraint FK_historial_medico foreign key (id_medico)
        references Medicos(id_medico) on delete set null
);

create table Medicamentos (
    id_medicamento int auto_increment not null,
    nombre_medicamento varchar(80) not null,
    presentacion varchar(50),
    concentracion varchar(30),
    laboratorio varchar(60),
    requiere_receta tinyint(1) default 0,
    estado_medicamento tinyint(1) default 1,
    primary key (id_medicamento)
);

create table Inventario (
    id_inventario int auto_increment not null,
    id_medicamento int not null,
    cantidad_disponible int default 0,
    cantidad_minima int default 10,
    fecha_vencimiento date not null,
    estado_inventario tinyint(1) default 1,
    primary key (id_inventario),
    constraint FK_inventario_medicamento foreign key (id_medicamento)
        references Medicamentos(id_medicamento) on delete cascade
);

create table Recetas (
    id_receta int auto_increment not null,
    id_historial int not null,
    id_medico int not null,
    id_paciente int not null,
    id_inventario int not null,
    fecha_receta datetime default current_timestamp,
    dosis varchar(50),
    duracion_dias int,
    cantidad_recetada int not null,
    estado_receta enum('Pendiente','Dispensada','Cancelada') default 'Pendiente',
    primary key (id_receta),
    constraint FK_receta_historial foreign key (id_historial)
        references HistorialClinico(id_historial) on delete cascade,
    constraint FK_receta_medico foreign key (id_medico)
        references Medicos(id_medico) on delete cascade,
    constraint FK_receta_paciente foreign key (id_paciente)
        references Pacientes(id_paciente) on delete cascade,
    constraint FK_receta_inventario foreign key (id_inventario)
        references Inventario(id_inventario) on delete cascade
);

-- ///// PROCEDIMIENTOS ALMACENADOS ///// --

-- LOGIN --
delimiter $$
create procedure sp_ValidarLogin(
    in p_correoLogin varchar(50),
    in p_contrasenaLogin varchar(100)
)
begin
    select id_login, correo_login, usuario_login, roles, estado_login
    from Login
    where correo_login = p_correoLogin 
        and contrasena_login = p_contrasenaLogin
        and estado_login = 1
    limit 1;
end$$
delimiter ;

-- PACIENTES --
delimiter $$
create procedure sp_ListarPacientes()
begin
    select p.*, l.usuario_login
    from Pacientes p
    left join Login l on p.id_login = l.id_login
    where p.estado_paciente = 1
    order by p.id_paciente;
end$$
delimiter ;

delimiter $$
create procedure sp_AgregarPaciente(
    in p_idLogin int,
    in p_nombre varchar(50),
    in p_apellido varchar(50),
    in p_fechaNacimiento date,
    in p_genero varchar(10),
    in p_telefono varchar(15),
    in p_direccion varchar(100),
    in p_tipoSangre varchar(5),
    in p_alergias text
)
begin
    insert into Pacientes(id_login, nombre_paciente, apellido_paciente, 
        fecha_nacimiento, genero, telefono, direccion, tipo_sangre, alergias)
    values(p_idLogin, p_nombre, p_apellido, p_fechaNacimiento,
        p_genero, p_telefono, p_direccion, p_tipoSangre, p_alergias);
end$$
delimiter ;

delimiter $$
create procedure sp_ActualizarPaciente(
    in p_idPaciente int,
    in p_nombre varchar(50),
    in p_apellido varchar(50),
    in p_fechaNacimiento date,
    in p_genero varchar(10),
    in p_telefono varchar(15),
    in p_direccion varchar(100),
    in p_tipoSangre varchar(5),
    in p_alergias text
)
begin
    update Pacientes
    set nombre_paciente = p_nombre,
        apellido_paciente = p_apellido,
        fecha_nacimiento = p_fechaNacimiento,
        genero = p_genero,
        telefono = p_telefono,
        direccion = p_direccion,
        tipo_sangre = p_tipoSangre,
        alergias = p_alergias
    where id_paciente = p_idPaciente;
end$$
delimiter ;

delimiter $$
create procedure sp_EliminarPaciente(in p_idPaciente int)
begin
    update Pacientes set estado_paciente = 0 where id_paciente = p_idPaciente;
end$$
delimiter ;

delimiter $$
create procedure sp_BuscarPacientePorId(in p_idPaciente int)
begin
    select * from Pacientes where id_paciente = p_idPaciente and estado_paciente = 1;
end$$
delimiter ;

-- ESPECIALIDADES --
delimiter $$
create procedure sp_ListarEspecialidades()
begin
    select * from Especialidades where estado_especialidad = 1 order by nombre_especialidad;
end$$
delimiter ;

delimiter $$
create procedure sp_AgregarEspecialidad(
    in p_nombre varchar(50),
    in p_descripcion text
)
begin
    insert into Especialidades(nombre_especialidad, descripcion)
    values(p_nombre, p_descripcion);
end$$
delimiter ;

delimiter $$
create procedure sp_ActualizarEspecialidad(
    in p_idEspecialidad int,
    in p_nombre varchar(50),
    in p_descripcion text
)
begin
    update Especialidades
    set nombre_especialidad = p_nombre,
        descripcion = p_descripcion
    where id_especialidad = p_idEspecialidad;
end$$
delimiter ;

delimiter $$
create procedure sp_EliminarEspecialidad(in p_idEspecialidad int)
begin
    update Especialidades set estado_especialidad = 0 where id_especialidad = p_idEspecialidad;
end$$
delimiter ;

-- MEDICOS --
delimiter $$
create procedure sp_ListarMedicos()
begin
    select m.*, l.usuario_login, e.nombre_especialidad
    from Medicos m
    left join Login l on m.id_login = l.id_login
    left join Especialidades e on m.id_especialidad = e.id_especialidad
    where m.estado_medico = 1
    order by m.id_medico;
end$$
delimiter ;

delimiter $$
create procedure sp_AgregarMedico(
    in p_idLogin int,
    in p_idEspecialidad int,
    in p_nombre varchar(50),
    in p_apellido varchar(50),
    in p_telefono varchar(15),
    in p_numeroColegiado varchar(30)
)
begin
    insert into Medicos(id_login, id_especialidad, nombre_medico, 
        apellido_medico, telefono, numero_colegiado)
    values(p_idLogin, p_idEspecialidad, p_nombre, p_apellido, p_telefono, p_numeroColegiado);
end$$
delimiter ;

delimiter $$
create procedure sp_ActualizarMedico(
    in p_idMedico int,
    in p_idEspecialidad int,
    in p_nombre varchar(50),
    in p_apellido varchar(50),
    in p_telefono varchar(15),
    in p_numeroColegiado varchar(30)
)
begin
    update Medicos
    set id_especialidad = p_idEspecialidad,
        nombre_medico = p_nombre,
        apellido_medico = p_apellido,
        telefono = p_telefono,
        numero_colegiado = p_numeroColegiado
    where id_medico = p_idMedico;
end$$
delimiter ;

delimiter $$
create procedure sp_EliminarMedico(in p_idMedico int)
begin
    update Medicos set estado_medico = 0 where id_medico = p_idMedico;
end$$
delimiter ;

-- HORARIOS --
delimiter $$
create procedure sp_ListarHorarios()
begin
    select h.*, m.nombre_medico, m.apellido_medico
    from Horarios h
    join Medicos m on h.id_medico = m.id_medico
    where h.estado_horario = 1
    order by h.dia_semana, h.hora_inicio;
end$$
delimiter ;

delimiter $$
create procedure sp_AgregarHorario(
    in p_idMedico int,
    in p_diaSemana varchar(10),
    in p_horaInicio time,
    in p_horaFin time
)
begin
    insert into Horarios(id_medico, dia_semana, hora_inicio, hora_fin)
    values(p_idMedico, p_diaSemana, p_horaInicio, p_horaFin);
end$$
delimiter ;

delimiter $$
create procedure sp_ActualizarHorario(
    in p_idHorario int,
    in p_diaSemana varchar(10),
    in p_horaInicio time,
    in p_horaFin time
)
begin
    update Horarios
    set dia_semana = p_diaSemana,
        hora_inicio = p_horaInicio,
        hora_fin = p_horaFin
    where id_horario = p_idHorario;
end$$
delimiter ;

delimiter $$
create procedure sp_EliminarHorario(in p_idHorario int)
begin
    update Horarios set estado_horario = 0 where id_horario = p_idHorario;
end$$
delimiter ;

delimiter $$
create procedure sp_BuscarHorariosPorMedico(in p_idMedico int)
begin
    select * from Horarios 
    where id_medico = p_idMedico and estado_horario = 1
    order by dia_semana, hora_inicio;
end$$
delimiter ;

-- CITAS --
delimiter $$
create procedure sp_ListarCitas()
begin
    select c.*, 
           p.nombre_paciente, p.apellido_paciente,
           m.nombre_medico, m.apellido_medico
    from Citas c
    join Pacientes p on c.id_paciente = p.id_paciente
    join Medicos m on c.id_medico = m.id_medico
    order by c.fecha_cita desc, c.hora_cita desc;
end$$
delimiter ;

delimiter $$
create procedure sp_AgregarCita(
    in p_idPaciente int,
    in p_idMedico int,
    in p_fechaCita date,
    in p_horaCita time,
    in p_motivo text
)
begin
    insert into Citas(id_paciente, id_medico, fecha_cita, hora_cita, motivo)
    values(p_idPaciente, p_idMedico, p_fechaCita, p_horaCita, p_motivo);
end$$
delimiter ;

delimiter $$
create procedure sp_ActualizarCita(
    in p_idCita int,
    in p_fechaCita date,
    in p_horaCita time,
    in p_motivo text,
    in p_estadoCita varchar(15)
)
begin
    update Citas
    set fecha_cita = p_fechaCita,
        hora_cita = p_horaCita,
        motivo = p_motivo,
        estado_cita = p_estadoCita
    where id_cita = p_idCita;
end$$
delimiter ;

delimiter $$
create procedure sp_EliminarCita(in p_idCita int)
begin
    delete from Citas where id_cita = p_idCita;
end$$
delimiter ;

delimiter $$
create procedure sp_BuscarCitasPorPaciente(in p_idPaciente int)
begin
    select c.*, m.nombre_medico, m.apellido_medico
    from Citas c
    join Medicos m on c.id_medico = m.id_medico
    where c.id_paciente = p_idPaciente
    order by c.fecha_cita desc, c.hora_cita desc;
end$$
delimiter ;

delimiter $$
create procedure sp_ActualizarEstadoCita(
    in p_idCita int,
    in p_estado varchar(15)
)
begin
    update Citas set estado_cita = p_estado where id_cita = p_idCita;
end$$
delimiter ;

-- HISTORIAL CLINICO --
delimiter $$
create procedure sp_ListarHistoriales()
begin
    select h.*, p.nombre_paciente, p.apellido_paciente,
           m.nombre_medico, m.apellido_medico
    from HistorialClinico h
    join Pacientes p on h.id_paciente = p.id_paciente
    left join Medicos m on h.id_medico = m.id_medico
    order by h.fecha_visita desc;
end$$
delimiter ;

delimiter $$
create procedure sp_AgregarHistorial(
    in p_idPaciente int,
    in p_idMedico int,
    in p_diagnostico text,
    in p_tratamiento text,
    in p_medicamentos text,
    in p_observaciones text
)
begin
    insert into HistorialClinico(id_paciente, id_medico, diagnostico, 
        tratamiento, medicamentos, observaciones)
    values(p_idPaciente, p_idMedico, p_diagnostico, p_tratamiento, p_medicamentos, p_observaciones);
end$$
delimiter ;

delimiter $$
create procedure sp_BuscarHistorialPorPaciente(in p_idPaciente int)
begin
    select h.*, m.nombre_medico, m.apellido_medico
    from HistorialClinico h
    left join Medicos m on h.id_medico = m.id_medico
    where h.id_paciente = p_idPaciente
    order by h.fecha_visita desc;
end$$
delimiter ;

-- MEDICAMENTOS --
delimiter $$
create procedure sp_ListarMedicamentos()
begin
    select * from Medicamentos where estado_medicamento = 1 order by nombre_medicamento;
end$$
delimiter ;

delimiter $$
create procedure sp_AgregarMedicamento(
    in p_nombre varchar(80),
    in p_presentacion varchar(50),
    in p_concentracion varchar(30),
    in p_laboratorio varchar(60),
    in p_requiereReceta tinyint(1)
)
begin
    insert into Medicamentos(nombre_medicamento, presentacion, concentracion, 
        laboratorio, requiere_receta)
    values(p_nombre, p_presentacion, p_concentracion, p_laboratorio, p_requiereReceta);
end$$
delimiter ;

delimiter $$
create procedure sp_ActualizarMedicamento(
    in p_idMedicamento int,
    in p_nombre varchar(80),
    in p_presentacion varchar(50),
    in p_concentracion varchar(30),
    in p_laboratorio varchar(60),
    in p_requiereReceta tinyint(1)
)
begin
    update Medicamentos
    set nombre_medicamento = p_nombre,
        presentacion = p_presentacion,
        concentracion = p_concentracion,
        laboratorio = p_laboratorio,
        requiere_receta = p_requiereReceta
    where id_medicamento = p_idMedicamento;
end$$
delimiter ;

delimiter $$
create procedure sp_EliminarMedicamento(in p_idMedicamento int)
begin
    update Medicamentos set estado_medicamento = 0 where id_medicamento = p_idMedicamento;
end$$
delimiter ;

-- INVENTARIO --
delimiter $$
create procedure sp_ListarInventario()
begin
    select i.*, m.nombre_medicamento
    from Inventario i
    join Medicamentos m on i.id_medicamento = m.id_medicamento
    where i.estado_inventario = 1
    order by i.fecha_vencimiento;
end$$
delimiter ;

delimiter $$
create procedure sp_AgregarInventario(
    in p_idMedicamento int,
    in p_cantidad int,
    in p_cantidadMinima int,
    in p_fechaVencimiento date
)
begin
    insert into Inventario(id_medicamento, cantidad_disponible, 
        cantidad_minima, fecha_vencimiento)
    values(p_idMedicamento, p_cantidad, p_cantidadMinima, p_fechaVencimiento);
end$$
delimiter ;

delimiter $$
create procedure sp_ActualizarInventario(
    in p_idInventario int,
    in p_cantidad int,
    in p_cantidadMinima int,
    in p_fechaVencimiento date
)
begin
    update Inventario
    set cantidad_disponible = p_cantidad,
        cantidad_minima = p_cantidadMinima,
        fecha_vencimiento = p_fechaVencimiento
    where id_inventario = p_idInventario;
end$$
delimiter ;

delimiter $$
create procedure sp_EliminarInventario(in p_idInventario int)
begin
    update Inventario set estado_inventario = 0 where id_inventario = p_idInventario;
end$$
delimiter ;

delimiter $$
create procedure sp_ActualizarStock(
    in p_idInventario int,
    in p_cantidad int
)
begin
    update Inventario 
    set cantidad_disponible = cantidad_disponible + p_cantidad 
    where id_inventario = p_idInventario;
end$$
delimiter ;

delimiter $$
create procedure sp_VerificarStockBajo()
begin
    select i.*, m.nombre_medicamento
    from Inventario i
    join Medicamentos m on i.id_medicamento = m.id_medicamento
    where i.cantidad_disponible <= i.cantidad_minima
    and i.estado_inventario = 1;
end$$
delimiter ;

-- RECETAS --
delimiter $$
create procedure sp_ListarRecetas()
begin
    select r.*, 
           p.nombre_paciente, p.apellido_paciente,
           m.nombre_medico, m.apellido_medico,
           med.nombre_medicamento
    from Recetas r
    join Pacientes p on r.id_paciente = p.id_paciente
    join Medicos m on r.id_medico = m.id_medico
    join Inventario i on r.id_inventario = i.id_inventario
    join Medicamentos med on i.id_medicamento = med.id_medicamento
    order by r.fecha_receta desc;
end$$
delimiter ;

delimiter $$
create procedure sp_AgregarReceta(
    in p_idHistorial int,
    in p_idMedico int,
    in p_idPaciente int,
    in p_idInventario int,
    in p_dosis varchar(50),
    in p_duracionDias int,
    in p_cantidad int
)
begin
    insert into Recetas(id_historial, id_medico, id_paciente, id_inventario,
        dosis, duracion_dias, cantidad_recetada)
    values(p_idHistorial, p_idMedico, p_idPaciente, p_idInventario,
        p_dosis, p_duracionDias, p_cantidad);
end$$
delimiter ;

delimiter $$
create procedure sp_ActualizarEstadoReceta(
    in p_idReceta int,
    in p_estado varchar(15)
)
begin
    update Recetas set estado_receta = p_estado where id_receta = p_idReceta;
end$$
delimiter ;

-- ///// REGISTROS ///// --

-- LOGIN --
insert into Login (correo_login, usuario_login, contrasena_login, roles) values
('admin1@gmail.com', 'admin1', '12345', 'Administrador'),
('medico1@gmail.com', 'medico1', '12345', 'Medico'),
('medico2@gmail.com', 'medico2', '12345', 'Medico'),
('enfermero1@gmail.com', 'enfermero1', '12345', 'Enfermero');

-- ESPECIALIDADES --
insert into Especialidades (nombre_especialidad, descripcion) values
('Cardiologia', 'Enfermedades del corazon y sistema circulatorio'),
('Dermatologia', 'Enfermedades de la piel'),
('Pediatria', 'Enfermedades en niños'),
('Ortopedia', 'Problemas del sistema musculoesqueletico'),
('Neurologia', 'Enfermedades del sistema nervioso'),
('Medicina General', 'Atencion medica primaria');

-- PACIENTES --
insert into Pacientes (nombre_paciente, apellido_paciente, fecha_nacimiento, 
    genero, telefono, direccion, tipo_sangre, alergias) values
('Maria', 'Gonzalez', '1985-06-15', 'Femenino', '55510001', 'Zona 1', 'O+', 'Ninguna'),
('Jose', 'Ramirez', '1978-11-22', 'Masculino', '55510002', 'Zona 2', 'A-', 'Penicilina'),
('Carmen', 'Lopez', '1990-03-10', 'Femenino', '55510003', 'Zona 3', 'B+', 'Ninguna'),
('Luis', 'Hernandez', '1965-08-05', 'Masculino', '55510004', 'Zona 4', 'AB-', 'Polen'),
('Ana', 'Martinez', '1995-12-12', 'Femenino', '55510005', 'Zona 5', 'O-', 'Ninguna'),
('Pedro', 'Garcia', '1982-05-20', 'Masculino', '55510006', 'Zona 6', 'A+', 'Ninguna');

-- MEDICOS --
insert into Medicos (id_login, id_especialidad, nombre_medico, apellido_medico, 
    telefono, numero_colegiado) values
(2, 1, 'Carlos', 'Mendez', '55520001', 'MED-001'),
(3, 2, 'Laura', 'Castillo', '55520002', 'MED-002'),
(2, 3, 'Roberto', 'Sanchez', '55520003', 'MED-003'),
(3, 4, 'Diana', 'Morales', '55520004', 'MED-004'),
(2, 5, 'Fernando', 'Reyes', '55520005', 'MED-005'),
(3, 6, 'Gabriela', 'Flores', '55520006', 'MED-006');

-- HORARIOS -- 
insert into Horarios (id_medico, dia_semana, hora_inicio, hora_fin) values
(1, 'Lunes', '08:00:00', '12:00:00'),
(1, 'Martes', '08:00:00', '12:00:00'),
(2, 'Miercoles', '09:00:00', '13:00:00'),
(3, 'Jueves', '08:00:00', '12:00:00'),
(4, 'Viernes', '10:00:00', '14:00:00'),
(5, 'Lunes', '14:00:00', '18:00:00'),
(6, 'Martes', '09:00:00', '13:00:00');

-- CITAS --
insert into Citas (id_paciente, id_medico, fecha_cita, hora_cita, motivo, estado_cita) values
(1, 1, '2026-02-10', '09:00:00', 'Dolor en el pecho y palpitaciones', 'Confirmada'),
(2, 2, '2026-02-11', '10:30:00', 'Erupcion cutanea en brazos', 'Pendiente'),
(3, 3, '2026-02-12', '08:30:00', 'Dolor lumbar persistente', 'Confirmada'),
(4, 4, '2026-02-13', '11:00:00', 'Fiebre y malestar general', 'Pendiente'),
(5, 5, '2026-02-14', '15:30:00', 'Dolores de cabeza frecuentes', 'Confirmada'),
(1, 6, '2026-02-15', '10:00:00', 'Control de tiroides', 'Pendiente');

-- HISTORIAL CLINICO --
insert into HistorialClinico (id_paciente, id_medico, diagnostico, tratamiento, 
    medicamentos, observaciones) values
(1, 1, 'Hipertension arterial', 'Medicacion antihipertensiva', 'Enalapril 20mg', 'Control de sal'),
(2, 2, 'Dermatitis alergica', 'Cremas antihistaminicas', 'Clobetasol crema', 'Posible alergia al polen'),
(3, 3, 'Lumbalgia aguda', 'Relajantes musculares, reposo', 'Diazepam 5mg', 'Mejorar postura'),
(4, 4, 'Amigdalitis aguda', 'Antibioticos y antiinflamatorios', 'Amoxicilina 500mg', 'Paciente pediatrico'),
(5, 5, 'Migraña cronica', 'Preventivos y analgesicos', 'Propranolol 40mg', 'Evitar estres'),
(1, 6, 'Hipotiroidismo', 'Terapia de reemplazo tiroideo', 'Levotiroxina 50mcg', 'Control en 3 meses');

-- MEDICAMENTOS --
insert into Medicamentos (nombre_medicamento, presentacion, concentracion, 
    laboratorio, requiere_receta) values
('Paracetamol', 'Tableta', '500mg', 'FarmaGT', 0),
('Amoxicilina', 'Capsula', '500mg', 'MediLab', 1),
('Enalapril', 'Tableta', '20mg', 'CardioPharm', 1),
('Clobetasol', 'Crema', '0.05%', 'DermaSA', 1),
('Diazepam', 'Tableta', '5mg', 'NeuroPharm', 1),
('Levotiroxina', 'Tableta', '50mcg', 'ThyroidCare', 1);

-- INVENTARIO -- 
insert into Inventario (id_medicamento, cantidad_disponible, cantidad_minima, fecha_vencimiento) values
(1, 100, 10, '2026-12-31'),
(2, 50, 10, '2026-11-30'),
(3, 30, 5, '2026-10-15'),
(4, 25, 5, '2027-01-20'),
(5, 15, 3, '2026-09-10'),
(6, 20, 5, '2027-03-01');

-- RECETAS --
insert into Recetas (id_historial, id_medico, id_paciente, id_inventario, 
    dosis, duracion_dias, cantidad_recetada) values
(1, 1, 1, 3, '1 tableta cada 24h', 30, 30),
(2, 2, 2, 4, 'Aplicar 2 veces al dia', 7, 1),
(3, 3, 3, 5, '1 tableta cada 8h', 5, 15),
(4, 4, 4, 2, '1 capsula cada 8h', 10, 30),
(5, 5, 5, 1, '1 tableta cada 8h', 3, 9),
(1, 6, 1, 6, '1 tableta cada 24h', 90, 90);

-- ///// CONSULTAS ///// --
select * from Pacientes;

select * from Citas;

call sp_VerificarStockBajo();

call sp_ListarHistoriales();

call sp_ListarRecetas();