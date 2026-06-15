import { BrMessage } from "@govbr-ds/react-components";
import RegisterForm from "./forms/register";
import { useState } from "react";

export default function AutocadastroPage() {
	const [success, setSuccess] = useState(false);

	return (
		<div className="d-flex flex-col items-center justify-center min-h-screen">
			<div className="d-flex flex-col gap-2 px-4 py-8 bg-pure-0 shadow-xl">
				<h1 className="text-center">AUTOCADASTRO</h1>
				{success && (
					<BrMessage
						status="success"
						title="Cadastro realizado com sucesso!"
						message="Agora você pode fazer login com suas credenciais."
						closable
					/>
				)}

				<RegisterForm onSuccess={() => setSuccess(true)} />
			</div>
		</div>
	);
}
