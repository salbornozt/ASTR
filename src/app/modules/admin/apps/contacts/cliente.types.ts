import internal from "stream";

export interface Cliente
{
    cod_cliente: number;
    nom_cliente: string;
    ocupacion?: string | "";
    ciudad?: string | "";
    cedula? : string | "";
    direccion?: string | "";
    cod_naturaleza: number;
    cod_tipo_cliente : number;
    sexo : number;
    birthday?: string | "";
    company?: string;
    correos?: {
        cod_email_cliente? : number;
        email: string;
        label: string;
        cod_cliente : number;
    }[];
    celulares?: {
        cod_celular_cliente? : number;
        numero: string;
        label: string;
        cod_cliente : number;
    }[];
    title?: string;
    notes?: string | null;
}