import { BrMessage } from "@govbr-ds/react-components";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { sleep } from "../../utils";
import UsuarioCadastroForm from "./feature/UsuarioCadastroForm";

export default function UsuarioCadastroPage(): React.ReactNode {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	async function handleSuccess() {
		setSuccess(true);
		await sleep(1500);
		navigate("/login");
	}

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
				<UsuarioCadastroForm onSuccess={handleSuccess} />
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
