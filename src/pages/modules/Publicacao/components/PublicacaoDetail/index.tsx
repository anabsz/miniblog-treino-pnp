import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Publicacao } from "../../../../../interfaces/Publicacao";
import PublicacaoService from "../../../../../services/models/PublicacaoService";
import { formatLongDate } from "../../../../utils";

export default function PublicacaoDetail() {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [publicacao, setPublicacao] = useState<Publicacao | null>(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	// -----------------------------
	// React Hooks
	// -----------------------------
	useEffect(() => {
		async function fetchPublicacao() {
			try {
				const data = await PublicacaoService.getById(Number(id));
				setPublicacao(data);
			} catch (error) {
				console.error("Erro ao buscar publicação:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchPublicacao();
	}, [id]);

	// -----------------------------
	// Funcões Auxiliares
	// -----------------------------
	if (loading) {
		return <p>Carregando...</p>;
	}

	if (!publicacao) {
		return <p>Publicação não encontrada.</p>;
	}

	return (
		<div>
			{publicacao ? (
				<div className="d-flex flex-col gap-4 mx-auto">
					<h1 className="my-0">{publicacao.titulo}</h1>
					<div className="flex gap-2 ">
						<span className="flex gap-1 items-center">
							<i className="fas fa-user"></i>
							{publicacao.autor.nome}
						</span>
						&bull;
						<span className="flex gap-1 items-center">
							<i className="fas fa-calendar-alt"></i>
							Publicado em: {formatLongDate(publicacao.publicado_em)}
						</span>
					</div>

					<img
						className="w-full h-72 object-cover "
						src={
							publicacao?.imagem
								? publicacao.imagem
								: "https://lupa1.com.br/migration/uploads/imagens/screenshot-20230301-210645-1677715941.jpg"
						}
						alt={publicacao?.titulo}
					/>
					<p className="text-justify">{publicacao.descricao}</p>
				</div>
			) : (
				<p>Publicação não encontrada.</p>
			)}
		</div>
	);
}
