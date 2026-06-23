import { useEffect, useState } from "react";
import type iPublicacao from "../../../interfaces/iPublicacao";
import PublicacaoService from "../../../services/models/PublicacaoService";
import { useParams } from "react-router";

export default function Detail() {
	const [publicacao, setPublicacao] = useState<iPublicacao | null>(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	function formatDate(date: string): string {
		return new Date(date).toLocaleString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	}

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
							Publicado em: {formatDate(publicacao.publicado_em)}
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
