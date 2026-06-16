import { Link, useNavigate } from "react-router";
import LoginForm from "./forms/login";
import { useState } from "react";
import { BrMessage } from "@govbr-ds/react-components";

export default function LoginPage() {
	const navigate = useNavigate();
	const [message, setMessage] = useState<React.ReactNode>(null);
	const [messageKey, setMessageKey] = useState(0);
	const [isError, setIsError] = useState(false);

	function handleOnError(message: string) {
		setMessage(message);
		setMessageKey((prev) => prev + 1);
		setIsError(true);
	}
	function handleOnSuccess(): void {
		setIsError(false);
		setMessage("Login realizado com sucesso!");
		setMessageKey((prev) => prev + 1);
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
