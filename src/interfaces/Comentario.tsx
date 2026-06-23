import type Autor from "./Autor";

export interface Comentario {
	id: number;
	mensagem: string;
	autor: Autor;
	publicacao: number;
	publicado_em: string;
}

export interface ComentarioSubmit {
	publicacao: number;
	mensagem: string;
}
