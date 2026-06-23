import type { iComentarioResponse } from "../../../interfaces/iComentarios";

export interface CadastraComentariosProps {
	publicacaoId: number;
	onSuccess: (data: iComentarioResponse) => void;
}
