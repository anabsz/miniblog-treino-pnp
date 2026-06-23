import type Autor from "./Autor";

export interface Publicacao {
	id: number;
	titulo: string;
	descricao: string;
	imagem: string | null;
	autor: Autor;
	publicado_em: string;
}

export interface PublicacaoSubmit {
	titulo: string;
	descricao: string;
	imagem?: File;
}
