export interface Contact
{
    cod_cliente: number;
    cedula: string;
    avatar?: string | null;
    
    nom_cliente: string;
    correos?: {
        email: string;
        label: string;
    }[];
    celulares?: {
        country?: string;
        numero: string;
        label: string;
    }[];
    ocupacion?: string;
    company?: string;
    birth_date?: string | null;
    direccion?: string | null;
    notes?: string | null;
    tags: string[];
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
