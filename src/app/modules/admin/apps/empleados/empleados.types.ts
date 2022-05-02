export interface Empleado
{
    cod_usuario: number;
    email: string;
    contrasena: string;
    nom_usuario: string;
    apellido_usuario: string;
    tipo_usuario: number;
    documento:string;
    celular: string;
    avatar?: string;
    status?: string;
}

export interface Country
{
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}

export interface Tag
{
    id?: string;
    title?: string;
}
