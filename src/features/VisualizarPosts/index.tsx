import { useEffect, useState } from "react";
import type { iVisualizarPostsProps } from "./interfaces/iVisualizarPublicacaoProps.tsx";
import { Link } from "react-router";
import PublicacaoService from "../../services/models/publicacaoService";

export default function VisualizarPosts({
	publicacoes,
	setPublicacoes,
}: iVisualizarPostsProps) {
	const [loading, setLoading] = useState(true);

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

	function PostSkeleton() {
		return (
			<div className="br-card p-4">
				<div className="w-full h-48 bg-gray-200 animate-pulse rounded" />

				<div className="mt-4 h-8 bg-gray-200 animate-pulse rounded" />

				<div className="mt-2 h-4 bg-gray-200 animate-pulse rounded" />
				<div className="mt-2 h-4 bg-gray-200 animate-pulse rounded" />
				<div className="mt-2 h-4 bg-gray-200 animate-pulse rounded w-3/4" />

				<div className="mt-4 h-3 bg-gray-200 animate-pulse rounded w-1/2" />
				<div className="mt-2 h-3 bg-gray-200 animate-pulse rounded w-1/3" />
			</div>
		);
	}

	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<PostSkeleton key={index} />
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 hover:cursor-pointer ">
			{publicacoes.length === 0 ? (
				<p>Nenhum post encontrado.</p>
			) : (
				publicacoes.map((post) => (
					<Link
						className="br-card d-flex flex-col bg-pure-0 p-4  hover:scale-105 hover:cursor-pointer "
						key={post.id}
						to={`/publicacao/${post.id}`}
					>
						<img
							className="w-full h-48 object-cover "
							src={
								post.imagem ||
								"https://lupa1.com.br/migration/uploads/imagens/screenshot-20230301-210645-1677715941.jpg"
							}
							alt={post.titulo}
						/>
						<h2 className="text-2xl! my-2 p-0">{post.titulo}</h2>
						<p className="text-base! my-2 line-clamp-3 flex-1">
							{post.descricao}
						</p>
						<p className="text-sm! my-1">Por: {post.autor.nome}</p>
						<p className="text-xs! my-1">
							Data: {formatDate(post.publicado_em)}
						</p>
					</Link>
				))
			)}
		</div>
	);
}
