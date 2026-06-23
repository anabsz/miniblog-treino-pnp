import { BrButton, BrModal } from "@govbr-ds/react-components";
import { useState } from "react";
import type { Publicacao } from "../../../interfaces/Publicacao";
import VisualizarPosts from "../../../features/VisualizarPosts";
import CriarPublicacao from "../../../features/CriarPublicacao";

export default function HomePage(): React.ReactNode {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);

	// -----------------------------
	// Modais
	// -----------------------------
	const [showModalOpen, setShowModalOpen] = useState(false);

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	async function handleSuccess(publicacao: Publicacao) {
		setPublicacoes((prev) => [publicacao, ...prev]);
		setShowModalOpen(false);
	}

	function handleError(message: string) {
		console.error("Erro ao criar publicação:", message);
	}

	return (
		<>
			<div className="py-4">
				<BrButton
					onClick={() => setShowModalOpen(true)}
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

			{/* Modais */}

			{showModalOpen && (
				<BrModal
					width="600px"
					isOpen={showModalOpen}
					title="Título do Modal"
					onClose={() => setShowModalOpen(false)}
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
