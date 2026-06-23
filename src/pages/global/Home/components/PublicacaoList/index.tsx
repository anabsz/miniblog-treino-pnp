import { useEffect, useState } from "react";
import { Link } from "react-router";
import PublicacaoListSkeleton from "../PublicacaoListSkeleton/index.tsx";
import type { PublicacaoListProps } from "./interfaces.ts";
import PublicacaoService from "../../../../../services/models/PublicacaoService/index.tsx";
import { formatLongDate } from "../../../../utils.ts";

export default function PublicacaoList({
	publicacoes,
	setPublicacoes,
}: PublicacaoListProps): React.ReactNode {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [loading, setLoading] = useState(true);

	// -----------------------------
	// Hooks do React e Form
	// -----------------------------
	useEffect(() => {
		async function getPosts() {
			try {
				const response = await PublicacaoService.get();
				setPublicacoes(response.results);
			} finally {
				setLoading(false);
			}
		}
		getPosts();
	}, [setPublicacoes]);

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<PublicacaoListSkeleton key={index} />
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 hover:cursor-pointer ">
			{publicacoes.length === 0 ? (
				<p>Nenhum post encontrado.</p>
			) : (
				publicacoes.map((pub) => (
					<Link
						className="br-card d-flex flex-col bg-pure-0 p-4  hover:scale-105 hover:cursor-pointer "
						key={pub.id}
						to={`/publicacao/${pub.id}`}
					>
						<img
							className="w-full h-48 object-cover "
							src={
								pub.imagem ||
								"https://lupa1.com.br/migration/uploads/imagens/screenshot-20230301-210645-1677715941.jpg"
							}
							alt={pub.titulo}
						/>
						<h2 className="text-2xl! my-2 p-0">{pub.titulo}</h2>
						<p className="text-base! my-2 line-clamp-3 flex-1">
							{pub.descricao}
						</p>
						<p className="text-sm! my-1">Por: {pub.autor.nome}</p>
						<p className="text-xs! my-1">
							Data: {formatLongDate(pub.publicado_em)}
						</p>
					</Link>
				))
			)}
		</div>
	);
}
