import type Usuario from "./Usuario";

// -----------------------------
// Interfaces de Modelo
// -----------------------------
export interface Publicacao {
	id: number;
	titulo: string;
	descricao: string;
	imagem: string | null;
	autor: Usuario;
	publicado_em: string;
}

// -----------------------------
// Interfaces de Submissão
// -----------------------------
export interface PublicacaoSubmit {
	titulo: string;
	descricao: string;
	imagem?: File;
}
