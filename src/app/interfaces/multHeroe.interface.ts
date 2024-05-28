export interface multHeroe {
    IdHeroe: {
        _id: string;
        nombre: string;
        bio: string;
        img: string;
        aparicion: string;
        casa: string;
    };
    multimedia: multimedia[];
}

export interface multimedia {
    _id: string;
    type: string;
    title: string;
    description: string;
    url: string;
    heroeId: string;
    IdGrupoMultimedia: {
        _id: string;
        nombre: string;
    };
    tipo?: string;
    estado?: string;
}