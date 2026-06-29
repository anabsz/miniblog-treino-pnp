import { useParams } from "react-router";
import { useState } from "react";
import ComentarioList from "./components/ComentarioList";
import type { Comentario } from "../../../interfaces/Comentario";
import ComentarioForm from "./features/ComentarioForm";
import PublicacaoDetail from "./components/PublicacaoDetail";

export default function PublicacaoPage() {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [comentarios, setComentarios] = useState<Comentario[]>([]);
	const { id } = useParams();

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	function handleSuccess(data: Comentario) {
		setComentarios((prevComentarios) => [data, ...prevComentarios]);
	}

	function handleError(error: string) {
		console.error("Erro ao criar comentário:", error);
	}

	return (
		<div className="d-flex flex-col gap-4 max-w-2xl mx-auto my-4">
			<PublicacaoDetail />
			<h2 className="my-0">Comentários</h2>
			<ComentarioForm
				publicacaoId={Number(id)}
				onSuccess={handleSuccess}
				onError={handleError}
			/>
			<ComentarioList
				comentarios={comentarios}
				setComentarios={setComentarios}
			/>
		</div>
	);
}
