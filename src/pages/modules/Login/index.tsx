import { Link, useNavigate } from "react-router";
import React, { useState } from "react";
import { BrMessage } from "@govbr-ds/react-components";
import { sleep } from "../../utils";
import LoginForm from "./feature/LoginForm";
export default function LoginPage(): React.ReactNode {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const navigate = useNavigate();
	const [message, setMessage] = useState<string>("");
	const [messageKey, setMessageKey] = useState(0);
	const [isError, setIsError] = useState(false);

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	function handleOnError(message: string): void {
		setIsError(true);
		setMessage(message);
		setMessageKey((prev) => prev + 1);
	}
	async function handleOnSuccess(message: string): Promise<void> {
		setIsError(false);
		setMessage(message);
		setMessageKey((prev) => prev + 1);
		await sleep(1500);
		navigate("/");
	}

	return (
		<div className="d-flex flex-col items-center justify-center min-h-screen">
			<div className="w-lg d-flex flex-col gap-2 px-4 py-8 bg-pure-0 shadow-xl">
				{message && (
					<BrMessage
						key={messageKey}
						status={isError ? "danger" : "success"}
						closable
						message={message}
					/>
				)}

				<h1 className="text-center">Entrar</h1>
				<LoginForm
					onSuccess={handleOnSuccess}
					onError={handleOnError}
				/>
				<div className="d-flex flex-col align-items-center">
					<p className="text-lg">Não possui cadastro?</p>
					<Link
						to="/cadastro"
						className="text-lg"
					>
						Cadastrar-se
					</Link>
				</div>
			</div>
		</div>
	);
}
