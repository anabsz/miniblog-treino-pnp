import { BrButton, BrInput } from "@govbr-ds/react-components";
import { useState } from "react";
import type { iLoginForm } from "../interfaces/iLoginForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useAuthState } from "../../../states/useAuthStates";
import { loginService } from "../services/loginService";
import axios from "axios";
import type iLoginFormProps from "../interfaces/iLoginFormProps";

export default function LoginForm({ onSuccess, onError }: iLoginFormProps) {
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

		try {
			const response = await loginService(data);
			const { access, refresh } = response;
			useAuthState.getState().login(access, refresh);
			onSuccess();
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				if (error.response.status === 401) {
					onError("Credenciais inválidas. Por favor, tente novamente.");
				}
			}
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
