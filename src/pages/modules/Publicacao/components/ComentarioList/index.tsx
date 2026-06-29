import { useParams } from "react-router";
import { useEffect } from "react";
import type { ComentarioListProps } from "./interfaces";
import type { Comentario } from "../../../../../interfaces/Comentario";
import { formatShortDate } from "../../../../utils";
import PublicacaoService from "../../../../../services/models/PublicacaoService";

/**
 * Lista os comentários de uma publicação específica.
 *
 * @param {UserAvatarProps} props
 * Lista de comentários e função para atualizar a lista.
 *
 * @param {Comentario[]} [props.comentarios]
 * Lista de comentários exibidos.
 *
 *  @param {Function} props.setComentarios
 * Função responsável por atualizar a lista de comentários.
 *
 * @returns {React.ReactNode}
 * Lista de comentários renderizada em formato de cards.
 *
 * @example
 * ```tsx
 * <ComentarioList
 *   comentarios={comentarios}
 *   setComentarios={setComentarios}
 * />
 * ```
 *
 * @author
 *   @anabsz
 */
export default function ComentarioList({
	comentarios,
	setComentarios,
}: ComentarioListProps) {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const { id } = useParams<{ id: string }>();

	// -----------------------------
	// Hooks do React e Form
	// -----------------------------
	useEffect(() => {
		async function fetchComentarios() {
			try {
				const response = await PublicacaoService.getComentarios(Number(id));
				setComentarios(response.results);
			} catch (error) {
				console.error("Erro ao buscar comentários:", error);
			}
		}

		fetchComentarios();
	}, [setComentarios, id]);

	return (
		<div>
			{comentarios.length > 0 ? (
				<ul className="list-none d-flex flex-col gap-4 p-0">
					{comentarios.map((comentario: Comentario) => (
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
										{formatShortDate(comentario.publicado_em)}
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
