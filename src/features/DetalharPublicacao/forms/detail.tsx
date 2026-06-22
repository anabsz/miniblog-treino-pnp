import { useEffect, useState } from "react";
import type iPublicacao from "../../../interfaces/iPublicacao";
import PublicacaoService from "../../../services/models/publicacaoService";
import { useParams } from "react-router";

export default function Detail() {
	const [publicacao, setPublicacao] = useState<iPublicacao | null>(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

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
				<div className="d-flex flex-col gap-4 max-w-2xl mx-auto">
					<h1>{publicacao.titulo}</h1>
					<small>{publicacao.autor.nome}</small>
					<img
						className="w-full h-72 object-cover"
						src={
							publicacao?.imagem
								? publicacao.imagem
								: "https://lupa1.com.br/migration/uploads/imagens/screenshot-20230301-210645-1677715941.jpg"
						}
						alt={publicacao?.titulo}
					/>
					<p>{publicacao.descricao}</p>
				</div>
			) : (
				<p>Publicação não encontrada.</p>
			)}
		</div>
	);
}
