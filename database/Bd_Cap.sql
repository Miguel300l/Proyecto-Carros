create database Cap;
use Cap;

create table Tbl_Jornada(
Id_Jornada int auto_increment not null,
Nombre_Jornada Varchar(50) not null,
constraint Pk_Id_Jornada primary key (Id_Jornada)
)ENGINE = InnoDB;

create table Tbl_Programa(
Id_Programa int auto_increment not null,
Nombre_Programa varchar (50) not null,
constraint Pk_Id_Programa primary key (Id_Programa)
)ENGINE = InnoDB;

create table Tbl_Roll(
Id_Roll int auto_increment not null,
Tipo_Roll varchar (20) not null,
constraint Pk_Id_Roll primary key (Id_Roll)
)ENGINE = InnoDB;

create table Tbl_Tipo_Evento(
Id_Tipo_Evento int auto_increment not null,
Tipo_Evento varchar (50) not null,
constraint Pk_Id_Tipo_Evento primary key (Id_Tipo_Evento)
)ENGINE = InnoDB;

create table Tbl_Multimedia(
Id_Multimedia int not null auto_increment,
Url_Multimedia integer  not null,
constraint Pk_id_Multimedia  primary key (Id_Multimedia )
)ENGINE=InnoDB;

CREATE TABLE Tbl_Profesion(
Id_Profesion int auto_increment not null,
Nombre_Profesion varchar (100) not null,
Descripcion_Profesion varchar (200) not null,
constraint Pk_Id_Profesion primary key (Id_Profesion)
)engine=InnoDB;

create table Tbl_Profesional(
Id_Profesional int auto_increment not null,
Nombre_Pro varchar (50) not null,
Apellido_Pro varchar (50) not null,
Nit_Pro int (20) not null,
Telefono_Pro int (15) not null,
Id_Profesion int null,
constraint Pk_Id_Profesional primary key (Id_Profesional),
constraint Fk_Id_Profesion foreign key (Id_Profesion) references Tbl_Profesion(Id_Profesion)
)ENGINE=InnoDB;

create table Tbl_Ficha(
Id_Ficha int  auto_increment not null,
Fecha_Inicio_Ficha datetime not null,
Fecha_Fin_Ficha datetime not null,
Id_Jornada int null,
Id_Programa int null,
constraint Pk_Id_Ficha primary key (Id_Ficha),
constraint Fk_Id_Jornada foreign key (Id_Jornada) references Tbl_Jornada (Id_Jornada),
constraint Fk_Id_Programa foreign key (Id_Programa) references Tbl_Programa (Id_Programa)
)ENGINE = InnoDB;

create table Tbl_Usuario(
Id_Usuario int auto_increment not null,
Nombre varchar (50) not null,
Apellido varchar (50) not null,
Documento integer (50) not null,
Email_Institucional varchar (50) not null,
Contraseña varchar (50) not null,
Genero varchar (30) not null,
Celular int (10) not null,
Id_Programa int null,
Id_Roll int null,
constraint Pk_Id_Usuario primary key (Id_Usuario),
constraint Fk_Id_Roll foreign key (Id_Roll) references Tbl_Roll (Id_Roll)
)ENGINE = InnoDB;

create table Tbl_Usuario_Ficha (
Id_Usuario int,
Id_Ficha int,
constraint Fk_Id_Usuario_Rel foreign key (Id_Usuario) references Tbl_Usuario (Id_Usuario),
constraint Fk_Id_Ficha_Rel foreign key (Id_Ficha) references Tbl_Ficha (Id_Ficha)

)ENGINE = InnoDB;

create table Tbl_Solicitudes(
Id_Solicitud_Charla int auto_increment not null,
Fecha_Inicio datetime not null,
Fecha_Fin datetime not null,
Motivo varchar (200) not null,
Estado varchar (50) not null,
Id_Usuario integer null,
Id_Profesional int null,
constraint Pk_Id_Solicitud_Charla primary key (Id_Solicitud_Charla),
constraint Pk_Id_Profesional foreign key (Id_Profesional) references Tbl_Profesional(Id_Profesional),
constraint Fk_Id_Usuario foreign key (Id_Usuario) references Tbl_Usuario (Id_Usuario)
)ENGINE = InnoDB;

create table Tbl_Pqrs(
Id_Pqrs int auto_increment not null,
Pqrs_Detalle Varchar(50) not null,
Fecha_Inicio_Pqrs datetime not null,
Fecha_Solucion_Pqrs datetime not null,
Solucion_pqrs varchar (200) not null,
Documento_Pqrs varchar (200) not null,
Id_Usuario int null,
constraint Pk_Id_Pqrs primary key (Id_Pqrs),
constraint Fk_Id_Usuario_Pqrs foreign key (Id_usuario) references Tbl_Usuario(Id_usuario)
)ENGINE = InnoDB;

create table Tbl_Eventos(
Id_Evento int auto_increment not null,
Titulo varchar (50) not null,
Estado_Evento boolean not null,
Descripcion_Evento varchar (150) not null,  
Fecha_Inicio_Evento datetime not null,
Fecha_Fin_Evento datetime not null,
Id_Tipo_evento int null,
Id_Multimedia int  null,
Id_Usuario int null,
constraint Pk_Id_Evento primary key (Id_Evento),
constraint Fk_Id_Tipo_Evento foreign key (Id_Tipo_Evento) references Tbl_Tipo_Evento(Id_Tipo_Evento),
constraint Fk_Id_Multimedia foreign key (Id_Multimedia) references Tbl_Multimedia (Id_Multimedia),
constraint Fk_Id_Usuario_Eventos foreign key (Id_Usuario) references Tbl_Usuario (Id_Usuario)
)ENGINE = InnoDB;