import type Autor from "./Autor";

// -----------------------------
// Interfaces de Modelo
// -----------------------------
export interface Comentario {
	id: number;
	mensagem: string;
	autor: Autor;
	publicacao: number;
	publicado_em: string;
}

// -----------------------------
// Interfaces de Submissão
// -----------------------------
export interface ComentarioSubmit {
	publicacao: number;
	mensagem: string;
}
