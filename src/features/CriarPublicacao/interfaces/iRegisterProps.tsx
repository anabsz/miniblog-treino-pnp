import type iPublicacao from "../../../interfaces/iPublicacao";

export interface IRegisterProps {
	onSuccess: (publicacao: iPublicacao) => void;
	onError: (message: string) => void | null;
}
