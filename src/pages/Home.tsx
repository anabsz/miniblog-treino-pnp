import { BrButton, BrModal } from "@govbr-ds/react-components";
import VisualizarPosts from "../features/VisualizarPosts";
import { useState } from "react";
import CriarPublicacao from "../features/CriarPublicacao";
import type iPublicacao from "../interfaces/iPublicacao";

export default function HomePage() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	async function handleSuccess(publicacao: iPublicacao) {
		closeModal();
		console.log("Publicação criada com sucesso:", publicacao);
	}

	return (
		<div className="py-4">
			<BrModal
				width="600px"
				isOpen={isModalOpen}
				title="Título do Modal"
				onClose={closeModal}
				showClose
			>
				<CriarPublicacao onSuccess={handleSuccess} />
			</BrModal>
			<BrButton
				onClick={openModal}
				primary
			>
				Criar Publicação
			</BrButton>

			<VisualizarPosts />
		</div>
	);
}
