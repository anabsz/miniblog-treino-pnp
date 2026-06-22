import type iPublicacao from "../../../interfaces/iPublicacao";

export interface iVisualizarPostsProps {
	publicacoes: iPublicacao[];
	setPublicacoes: React.Dispatch<React.SetStateAction<iPublicacao[]>>;
}
