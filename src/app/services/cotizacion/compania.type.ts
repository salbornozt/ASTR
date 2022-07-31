export interface Compania{
    cod_compania? : number,
    nom_compania? : string,
    direccion_compania? : string
}

export interface Producto{
    cod_producto? : number,
    cod_ramo? :number,
    nom_producto? : string
}


export interface Ramo{
    cod_compania? : number,
    cod_ramo? :number,
    nom_ramo? : string
}

