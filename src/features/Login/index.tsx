import { Link, useNavigate } from "react-router";
import LoginForm from "./forms/login";

export default function LoginPage() {
	const navigate = useNavigate();

	function handleOnSuccess(): void {
		navigate("/");
	}

	return (
		<div className="d-flex flex-col items-center justify-center min-h-screen">
			<div className="w-lg d-flex flex-col gap-2 px-4 py-8 bg-pure-0 shadow-xl">
				<h1 className="text-center">Entrar</h1>
				<LoginForm onSuccess={handleOnSuccess} />
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
