import { BrMessage } from "@govbr-ds/react-components";
import RegisterForm from "./forms/register";
import { useState } from "react";
import { Link } from "react-router";

export default function AutocadastroPage() {
	const [success, setSuccess] = useState(false);

	return (
		<div className="d-flex flex-col items-center justify-center min-h-screen">
			<div className="w-lg d-flex flex-col gap-2 px-4 py-8 bg-pure-0 shadow-xl">
				<h1 className="text-center">Cadastro</h1>
				{success && (
					<BrMessage
						status="success"
						title="Cadastro realizado com sucesso!"
						message="Agora você pode fazer login com suas credenciais."
						closable
					/>
				)}
				<RegisterForm onSuccess={() => setSuccess(true)} />
				<div className="d-flex flex-col align-items-center">
					<p className="text-lg">Já possui cadastro?</p>
					<Link
						to="/login"
						className="text-lg"
					>
						Entrar no sistema
					</Link>
				</div>
			</div>
		</div>
	);
}
