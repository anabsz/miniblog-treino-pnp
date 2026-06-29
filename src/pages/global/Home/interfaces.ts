import type { Publicacao } from "../../../interfaces/Publicacao";

export interface PublicacaoFormProps {
	onSuccess: (response: Publicacao) => void;
	onError: (message: string) => void | null;
}
