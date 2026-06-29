import type { Comentario } from "../../../../../interfaces/Comentario";

export interface ComentarioFormProps {
	publicacaoId: number;
	onSuccess: (response: Comentario) => void;
	onError: (message: string) => void;
}

export interface ComentarioFormSubmit {
	mensagem: string;
}
