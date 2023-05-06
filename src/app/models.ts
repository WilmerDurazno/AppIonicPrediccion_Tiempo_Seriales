export interface exaCliente{
    id: string;
    nombres: string;
    apellidos: string;
    edad: string;
    genero: string;
    educacion: string;
    nacionalidad:string;
    telefono:string;
    fecha: Date;
    email: string;
    password: any;
    tiempo:any;
}

export interface Cliente{
    nacionalidad: string;
    edad: number;
}