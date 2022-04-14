export interface User
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
