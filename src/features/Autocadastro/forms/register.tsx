import { BrInput, BrButton } from "@govbr-ds/react-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { iRegisterForm } from "../interfaces/iRegisterForm";
import { registerService } from "../services/registerService";
import axios from "axios";
import { schema } from "./schema";
import { useState } from "react";
import type { iRegisterFormProps } from "../interfaces/iRegisterFormProps";

export default function RegisterForm({ onSuccess }: iRegisterFormProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [loading, setLoading] = useState(false);

	function togglePassword() {
		setShowPassword((prev) => !prev);
	}

	function togglePasswordConfirm() {
		setShowPasswordConfirm((prev) => !prev);
	}

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<iRegisterForm>({
		resolver: yupResolver(schema),
	});

	async function handleData(data: iRegisterForm) {
		setLoading(true);

		try {
			const registerData = {
				username: data.username,
				nome: data.name,
				senha: data.password,
			};
			const response = await registerService(registerData);
			onSuccess();
			return response;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				if (error.response.status === 400 && error.response.data.username) {
					setError("username", {
						type: "server",
						message:
							error.response.data.username[0] ??
							"O nome de usuário já está em uso",
					});
				}
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			onSubmit={handleSubmit(handleData)}
			className="d-flex flex-col gap-4"
		>
			<BrInput
				label="Nome de Usuário"
				{...register("username")}
				status={errors.username ? "danger" : undefined}
				feedbackText={errors.username?.message}
			/>
			<BrInput
				label="Nome"
				{...register("name")}
				status={errors.name ? "danger" : undefined}
				feedbackText={errors.name?.message}
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
			<BrInput
				label="Confirmar Senha"
				type={showPasswordConfirm ? "text" : "password"}
				{...register("passwordConfirm")}
				status={errors.passwordConfirm ? "danger" : undefined}
				feedbackText={errors.passwordConfirm?.message}
			>
				<BrButton
					icon={
						showPasswordConfirm ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
					}
					onClick={togglePasswordConfirm}
				/>
			</BrInput>
			<div>
				<BrButton
					primary
					type="submit"
					className="w-full! mx-auto"
					disabled={loading}
				>
					{loading ? "Cadastrando..." : "Cadastrar"}
				</BrButton>
			</div>
		</form>
	);
}
