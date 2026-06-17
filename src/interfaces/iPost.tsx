import type iAutor from "./iAutor";

export default interface iPost {
	id: number;
	titulo: string;
	descricao: string;
	imagem: string | null;
	autor: iAutor;
	publicado_em: string;
}
