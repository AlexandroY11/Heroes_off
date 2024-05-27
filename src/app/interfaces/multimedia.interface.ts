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