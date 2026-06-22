import { BrButton, BrModal } from "@govbr-ds/react-components";
import VisualizarPosts from "../features/VisualizarPosts";
import { useState } from "react";
import CriarPublicacao from "../features/CriarPublicacao";
import type iPublicacao from "../interfaces/iPublicacao";

export default function HomePage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [publicacoes, setPublicacoes] = useState<iPublicacao[]>([]);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	function handleError(message: string) {
		// Aqui você pode implementar a lógica para exibir a mensagem de erro, como um toast ou um alerta
		console.error("Erro ao criar publicação:", message);
	}

	async function handleSuccess(publicacao: iPublicacao) {
		setPublicacoes((prev) => [publicacao, ...prev]);
		closeModal();
	}

	return (
		<>
			<div className="py-4">
				<BrButton
					onClick={openModal}
					primary
					className="mb-4"
				>
					Criar Publicação
				</BrButton>

				<VisualizarPosts
					publicacoes={publicacoes}
					setPublicacoes={setPublicacoes}
				/>
			</div>

			{isModalOpen && (
				<BrModal
					width="600px"
					isOpen={isModalOpen}
					title="Título do Modal"
					onClose={closeModal}
					showClose
				>
					<CriarPublicacao
						onSuccess={handleSuccess}
						onError={handleError}
					/>
				</BrModal>
			)}
		</>
	);
}
