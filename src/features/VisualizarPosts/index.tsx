import { useEffect, useState } from "react";
import type iPost from "../../interfaces/iPost";
import postService from "../../services/models/postService";

export default function VisualizarPosts() {
	const [posts, setPosts] = useState<iPost[]>([]);

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
				const response = await postService.get();
				setPosts(response.results);
			} catch (error) {
				console.error("Erro ao buscar posts:", error);
			}
		}

		getPosts();
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 hover:cursor-pointer ">
			{posts.length === 0 ? (
				<p>Nenhum post encontrado.</p>
			) : (
				posts.map((post) => (
					<div
						className="br-card d-flex flex-col bg-pure-0 p-4  hover:scale-105"
						key={post.id}
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
					</div>
				))
			)}
		</div>
	);
}
