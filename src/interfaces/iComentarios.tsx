import type iAutor from "./iAutor";

export interface iComentarios {
	id: number;
	comentario: string;
	autor: iAutor;
	publicacao: number;
	publicado_em: string;
}
