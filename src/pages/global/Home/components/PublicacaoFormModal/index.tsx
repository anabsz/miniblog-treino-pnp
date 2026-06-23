import { BrMessage, BrModal } from "@govbr-ds/react-components";
import { useState } from "react";
import { sleep } from "../../../../utils";
import type { Publicacao } from "../../../../../interfaces/Publicacao";
import PublicacaoForm from "../../features/PublicacaoForm";
import type { PublicacaoFormModalProps } from "./interfaces";

export default function PublicacaoFormModal(
	props: PublicacaoFormModalProps
): React.ReactNode {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [message, setMessage] = useState<React.ReactNode>(null);
	const [messageKey, setMessageKey] = useState(0);
	const [isError, setIsError] = useState(false);

	// -----------------------------
	// Modais
	// -----------------------------
	const { showModalOpen, setShowModalOpen } = props;

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	async function handleSuccess(response: Publicacao) {
		setIsError(false);
		setMessage("Publicação criada com sucesso!");
		setMessageKey((prev) => prev + 1);
		await sleep(1000); // Aguarda 1 segundo

		props.onSuccess(response);
	}

	function handleError(message: string) {
		setMessage(message);
		setMessageKey((prev) => prev + 1);
		setIsError(true);
	}

	return (
		<BrModal
			width="600px"
			isOpen={showModalOpen}
			title="Cadastrar Publicação"
			onClose={() => setShowModalOpen(false)}
			showClose
		>
			<div className="p-4">
				{message && (
					<BrMessage
						key={messageKey}
						status={isError ? "danger" : "success"}
						closable
						message={message}
					/>
				)}

				<PublicacaoForm
					onSuccess={handleSuccess}
					onError={handleError}
				/>
			</div>
		</BrModal>
	);
}
