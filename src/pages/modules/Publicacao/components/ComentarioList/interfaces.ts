import type { Comentario } from "../../../../../interfaces/Comentario";

export interface ComentarioListProps {
	comentarios: Comentario[];
	setComentarios: (comentarios: Comentario[]) => void;
}
