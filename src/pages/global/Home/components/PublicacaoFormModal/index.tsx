import { BrMessage, BrModal } from "@govbr-ds/react-components";
import { useState } from "react";
import { sleep } from "../../../../utils";
import type { Publicacao } from "../../../../../interfaces/Publicacao";
import PublicacaoForm from "../../features/PublicacaoForm";
import type { PublicacaoFormModalProps } from "./interfaces";

/**
 * Modal responsável pelo cadastro de uma nova publicação.
 *
 *  @param {PublicacaoFormModalProps} props Propriedades de sucesso, erro e estado do modal.
 *
 * @param {boolean} props.showModalOpen Estado do modal (aberto ou fechado).
 *
 * @param {Function} props.setShowModalOpen Função para alterar o estado do modal.
 *
 * @param {{response: Publicacao}} props.onSuccess
 * Função a ser chamada quando a publicação for criada com sucesso.
 *
 * @param {{message: string}} props.onError
 * Função a ser chamada quando ocorrer um erro ao criar a publicação.
 *
 * @returns {React.ReactNode}
 * Modal de cadastro de publicação.
 *
 * @example
 * ```ts
 * import { PublicacaoFormModal } from "@/PublicacaoFormModal";
 *
 * const [showModalOpen, setShowModalOpen] = useState(false);
 *
 * function handleSuccess(response: Publicacao) {
 *   console.log("Publicação criada com sucesso:", response);
 * }
 *
 * function handleError(message: string) {
 *  console.error("Erro ao criar publicação:", message);
 * }

 * <PublicacaoFormModal
 *  showModalOpen={showModalOpen}
 *  setShowModalOpen={setShowModalOpen}
 *  onSuccess={handleSuccess}
 *  onError={handleError}
 * />
 * ```
 *
 * @author
 *   @anabsz
 */
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
