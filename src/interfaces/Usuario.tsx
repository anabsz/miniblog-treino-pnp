// -----------------------------
// Interfaces de Modelo
// -----------------------------
export default interface Usuario {
	id: number;
	nome: string;
	username: string;
}

// -----------------------------
// Interface de Submissão
// -----------------------------
export interface UsuarioSubmit {
	username: string;
	nome: string;
	senha: string;
}

// -----------------------------
// Interface de Token
// -----------------------------
export interface Token {
	access: string;
	refresh: string;
}
