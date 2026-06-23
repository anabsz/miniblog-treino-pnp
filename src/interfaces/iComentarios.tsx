import type iAutor from "./iAutor";

export interface iComentario {
	id: number;
	mensagem: string;
	autor: iAutor;
	publicacao: number;
	publicado_em: string;
}

export interface iComentarioSubmit {
	publicacao: number;
	mensagem: string;
}

export interface iComentarioForm {
	mensagem: string;
}

export interface iComentarioResponse {
	id: number;
	mensagem: string;
	autor: iAutor;
	publicacao: number;
	publicado_em: string;
}
