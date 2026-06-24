import { BrButton } from "@govbr-ds/react-components";
import { useState } from "react";
import type { Publicacao } from "../../../interfaces/Publicacao";
import PublicacaoList from "./components/PublicacaoList";
import PublicacaoFormModal from "./components/PublicacaoFormModal";

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

				<PublicacaoList
					publicacoes={publicacoes}
					setPublicacoes={setPublicacoes}
				/>
			</div>

			{/* Modais */}

			{showModalOpen && (
				<PublicacaoFormModal
					onSuccess={handleSuccess}
					onError={handleError}
					showModalOpen={showModalOpen}
					setShowModalOpen={setShowModalOpen}
				/>
			)}
		</>
	);
}
