import type Usuario from "./Usuario";

// -----------------------------
// Interfaces de Modelo
// -----------------------------
export interface Comentario {
	id: number;
	mensagem: string;
	autor: Usuario;
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
