export interface MultimediasInterface {
    _id: string;
    url: string;
    tipo: string;
    estado: boolean;
    IdGrupoMultimedia: {
        _id: string;
        nombre: string;
    };
    usuario: {
        nombre: string;
        _id: string;
    };
    fecha_creacion: string;
    fecha_actualizacion: string;

}

export interface MultimediasHeroeInterface {
    IdHeroe: {
        _id: string,
        nombre: string,
    };
    IdMultimedia: {
        _id: string,
        url: string,
    };
    fecha_creacion: string;
    _id: string;
}

export interface multimedia {
    _id?: string;
    url: string;
    tipo: string;
    estado: string;
    IdGrupoMultimedia: {
        _id: string;
        nombre: string;
    };
    usuario: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}