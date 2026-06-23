import { useParams } from "react-router";
import type { iComentario } from "../../interfaces/iComentarios";
import PublicacaoService from "../../services/models/PublicacaoService";
import { useEffect } from "react";
import type { VisualizarComentariosProps } from "./interfaces/VisualizarComentariosProps";

export default function VisualizarComentarios(
	props: VisualizarComentariosProps
) {
	const { id } = useParams<{ id: string }>();

	function formatDate(date: string): string {
		return new Date(date).toLocaleString("pt-BR", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
	}

	useEffect(() => {
		async function fetchComentarios() {
			try {
				const response = await PublicacaoService.getComentarios(Number(id));
				props.setComentarios(response.results);
			} catch (error) {
				console.error("Erro ao buscar comentários:", error);
			}
		}

		fetchComentarios();
	}, [props, id]);

	return (
		<div>
			{props.comentarios.length > 0 ? (
				<ul className="list-none d-flex flex-col gap-4 p-0">
					{props.comentarios.map((comentario: iComentario) => (
						<li
							key={comentario.id}
							className=" p-2 shadow-md"
						>
							<div className="d-flex gap-3">
								<img
									className="w-12 h-12 rounded-full"
									src="https://placehold.co/50x50"
									alt={`Avatar de ${comentario.autor.nome}`}
								/>
								<div className="d-flex flex-col gap-1 ">
									<p className="m-0 text-sm! underline">
										{comentario.autor.nome}
									</p>
									<p className="m-0 text-sm!">
										{formatDate(comentario.publicado_em)}
									</p>
								</div>
							</div>
							<p className="m-0 p-2">{comentario.mensagem}</p>
						</li>
					))}
				</ul>
			) : (
				<p>Nenhum comentário ainda.</p>
			)}
		</div>
	);
}
