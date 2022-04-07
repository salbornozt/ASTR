export interface User
{
    cod_usuario: number;
    email: string;
    contrasena: string;
    nom_usuario: string;
    tipo_usuario: number;
    avatar?: string;
    status?: string;
}
