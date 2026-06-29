import { BrButton } from "@govbr-ds/react-components";
import { useMemo, useState } from "react";
import type { Publicacao } from "../../../interfaces/Publicacao";
import PublicacaoList from "./components/PublicacaoList";
import PublicacaoFormModal from "./components/PublicacaoFormModal";
import PublicacaoSearch from "./components/PublicacaoSearch";

export default function HomePage(): React.ReactNode {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [search, setSearch] = useState<string>("");
	const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);

	// -----------------------------
	// Modais
	// -----------------------------
	const [showModalOpen, setShowModalOpen] = useState(false);

	// -----------------------------
	// Hooks
	// -----------------------------
	const filteredPublicacao: Publicacao[] = useMemo(() => {
		return publicacoes.filter((p) =>
			p.titulo.toLowerCase().includes(search.toLowerCase())
		);
	}, [publicacoes, search]);

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	async function handleSuccess(publicacao: Publicacao): Promise<void> {
		setPublicacoes((prev) => [publicacao, ...prev]);
		setShowModalOpen(false);
	}

	function handleError(message: string) {
		console.error("Erro ao criar publicação:", message);
	}

	return (
		<>
			<div className="py-4">
				<div className="flex gap-2">
					<BrButton
						onClick={() => setShowModalOpen(true)}
						primary
						className="mb-4"
					>
						Criar Publicação
					</BrButton>
					<PublicacaoSearch
						value={search}
						onChange={setSearch}
					/>
				</div>

				<PublicacaoList
					publicacoes={filteredPublicacao}
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
