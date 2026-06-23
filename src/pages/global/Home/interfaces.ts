import type { Publicacao } from "../../../interfaces/Publicacao";

export interface PublicacaoFormProps {
	onSuccess: (publicacao: Publicacao) => void;
	onError: (message: string) => void | null;
}
