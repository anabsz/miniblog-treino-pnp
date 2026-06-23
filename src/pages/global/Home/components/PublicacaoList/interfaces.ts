import type { Publicacao } from "../../../../../interfaces/Publicacao";

export interface PublicacaoListProps {
	publicacoes: Publicacao[];
	setPublicacoes: (publicacoes: Publicacao[]) => void;
}
