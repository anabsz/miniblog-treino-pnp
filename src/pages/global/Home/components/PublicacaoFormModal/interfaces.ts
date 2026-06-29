import type { Publicacao } from "../../../../../interfaces/Publicacao";

export interface PublicacaoFormModalProps {
	onSuccess: (response: Publicacao) => void;
	onError: (message: string) => void;
	showModalOpen: boolean;
	setShowModalOpen: (show: boolean) => void;
}
