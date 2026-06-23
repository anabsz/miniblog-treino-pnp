import { useParams } from "react-router";
import CadastrarComentario from "../features/CadastrarComentario";
import DetalharPublicacao from "../features/DetalharPublicacao";
import VisualizarComentarios from "../features/VisualizarComentarios";
import { useState } from "react";
import type {
	iComentario,
	iComentarioResponse,
} from "../interfaces/iComentarios";

export default function PublicacaoPage() {
	const [comentarios, setComentarios] = useState<iComentario[]>([]);
	const { id } = useParams();

	function handleSuccess(data: iComentarioResponse) {
		setComentarios((prevComentarios) => [data, ...prevComentarios]);
	}

	return (
		<div className="d-flex flex-col gap-4 max-w-2xl mx-auto my-4">
			<DetalharPublicacao />
			<h2 className="my-0">Comentários</h2>
			<CadastrarComentario
				publicacaoId={Number(id)}
				onSuccess={handleSuccess}
			/>
			<VisualizarComentarios
				comentarios={comentarios}
				setComentarios={setComentarios}
			/>
		</div>
	);
}
