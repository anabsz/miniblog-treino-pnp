import { BrButton, BrInput } from "@govbr-ds/react-components";
import { useState } from "react";

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);

	function togglePassword() {
		setShowPassword((prev) => !prev);
	}

	return (
		<form>
			<BrInput label="Nome de Usuário" />
			<BrInput
				label="Senha"
				type={showPassword ? "text" : "password"}
			>
				<BrButton
					icon={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
					onClick={togglePassword}
				/>
			</BrInput>
		</form>
	);
}
