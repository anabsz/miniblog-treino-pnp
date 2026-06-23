import type { iComentario } from "../../../interfaces/iComentarios";

export interface VisualizarComentariosProps {
	comentarios: iComentario[];
	setComentarios: React.Dispatch<React.SetStateAction<iComentario[]>>;
}
