import { BrMessage } from "@govbr-ds/react-components";
import type iPublicacao from "../../interfaces/iPublicacao";
import Register from "./forms/register";
import type { IRegisterProps } from "./interfaces/iRegisterProps";
import { useState } from "react";

export default function CriarPublicacao(iRegisterProps: IRegisterProps) {
	const [message, setMessage] = useState<React.ReactNode>(null);
	const [messageKey, setMessageKey] = useState(0);
	const [isError, setIsError] = useState(false);

	async function handleSuccess(publicacao: iPublicacao) {
		setIsError(false);
		setMessage("Publicação criada com sucesso!");
		setMessageKey((prev) => prev + 1);
		const sleep = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));
		await sleep(1000); // Aguarda 1 segundo

		iRegisterProps.onSuccess(publicacao);
	}
	function handleError(message: string) {
		setMessage(message);
		setMessageKey((prev) => prev + 1);
		setIsError(true);
	}

	return (
		<div className="p-4">
			{message && (
				<BrMessage
					key={messageKey}
					status={isError ? "danger" : "success"}
					closable
					message={message}
				/>
			)}

			<Register
				onSuccess={handleSuccess}
				onError={handleError}
			/>
		</div>
	);
}
