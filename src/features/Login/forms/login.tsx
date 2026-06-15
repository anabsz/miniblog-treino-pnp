import { BrButton, BrInput } from "@govbr-ds/react-components";
import { useState } from "react";
import type { iLoginForm } from "../interfaces/iLoginForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

export default function LoginForm() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	function togglePassword() {
		setShowPassword((prev) => !prev);
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<iLoginForm>({
		resolver: yupResolver(schema),
	});

	async function handleData(data: iLoginForm) {
		setLoading(true);

		const delay = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));
		await delay(2000); // Simula um atraso de 2 segundos

		try {
			console.log("Dados do formulário:", data);
		} catch (error) {
			console.error("Erro ao processar o login:", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit(handleData)}>
			<BrInput
				label="Nome de Usuário"
				{...register("username")}
				status={errors.username ? "danger" : undefined}
				feedbackText={errors.username?.message}
			/>
			<BrInput
				label="Senha"
				type={showPassword ? "text" : "password"}
				{...register("password")}
				status={errors.password ? "danger" : undefined}
				feedbackText={errors.password?.message}
			>
				<BrButton
					icon={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
					onClick={togglePassword}
				/>
			</BrInput>
			<div>
				<BrButton
					primary
					type="submit"
					className="w-full! mx-auto"
					disabled={loading}
				>
					Entrar
				</BrButton>
			</div>
		</form>
	);
}
