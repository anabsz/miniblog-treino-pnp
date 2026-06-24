import { BrButton, BrInput } from "@govbr-ds/react-components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import type { LoginForm, LoginFormProps } from "./interfaces";
import { loginSchema } from "./schema";
import { loginService } from "./services";
import { useAuthStore } from "../../../../../stores/useAuthStore";
import type { Token } from "../../../../../interfaces/Usuario";
/**
 * Formulário responsável pela autenticação de usuários.
 *
 * @param {LoginFormProps} props Funlções de sucesso e erro para o login.
 *
 * @param {(message: string) => void} props.onSuccess
 * Função executada quando o login é realizado com sucesso.
 *
 * @param {(message: string) => void} props.onError
 * Função executada quando ocorre falha durante a autenticação.
 *
 * @returns {React.ReactNode}
 * Formulário de login contendo campos de usuário e senha.
 *
 * @example
 * ```tsx
 * <LoginForm
 *   onSuccess={(message) => {
 *     console.log(message);
 *     navigate("/");
 *   }}
 *   onError={(message) => {
 *     console.error(message);
 *   }}
 * />
 * ```
 *
 * @author
 *   @anabsz
 */
export default function LoginForm(props: LoginFormProps): React.ReactNode {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	// -----------------------------
	// Hooks do React e Form
	// -----------------------------
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: yupResolver(loginSchema),
	});

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	function togglePassword(): void {
		setShowPassword((prev) => !prev);
	}

	async function handleData(data: LoginForm): Promise<void> {
		setLoading(true);
		try {
			const response: Token = await loginService(data);
			const { access, refresh } = response;
			useAuthStore.getState().login(access, refresh);
			props.onSuccess("Login realizado com sucesso!");
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				if (error.response.status === 401) {
					props.onError("Credenciais inválidas. Por favor, tente novamente.");
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
