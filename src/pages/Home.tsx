import { BrButton, BrModal } from "@govbr-ds/react-components";
import VisualizarPosts from "../features/VisualizarPosts";
import { useState } from "react";
import CriarPublicacao from "../features/CriarPublicacao";

export default function HomePage() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	function openModal() {
		setIsModalOpen(true);
	}
	function closeModal() {
		setIsModalOpen(false);
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
				<CriarPublicacao />
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
