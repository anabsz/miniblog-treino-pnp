import { BrInput, BrButton } from "@govbr-ds/react-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import type { UsuarioCadastroFormProps, UsuarioSubmitForm } from "./interfaces";
import { cadastroService } from "./services";
import { usuarioSchema } from "./schema";
import type { UsuarioSubmit } from "../../../../../interfaces/Usuario";

export default function UsuarioCadastroForm(
	props: UsuarioCadastroFormProps
): React.ReactNode {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [loading, setLoading] = useState(false);

	// -----------------------------
	// Hooks do React e Form
	// -----------------------------
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<UsuarioSubmitForm>({
		resolver: yupResolver(usuarioSchema),
	});

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	function togglePassword(): void {
		setShowPassword((prev) => !prev);
	}

	function togglePasswordConfirm(): void {
		setShowPasswordConfirm((prev) => !prev);
	}

	async function handleData(data: UsuarioSubmitForm): Promise<void> {
		setLoading(true);

		try {
			const payload: UsuarioSubmit = {
				username: data.username,
				nome: data.nome,
				senha: data.senha,
			};
			const response = await cadastroService(payload);
			props.onSuccess(response);
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
				{...register("nome")}
				status={errors.nome ? "danger" : undefined}
				feedbackText={errors.nome?.message}
			/>
			<BrInput
				label="Senha"
				type={showPassword ? "text" : "password"}
				{...register("senha")}
				status={errors.senha ? "danger" : undefined}
				feedbackText={errors.senha?.message}
			>
				<BrButton
					icon={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
					onClick={togglePassword}
				/>
			</BrInput>
			<BrInput
				label="Confirmar Senha"
				type={showPasswordConfirm ? "text" : "password"}
				{...register("senhaConfirm")}
				status={errors.senhaConfirm ? "danger" : undefined}
				feedbackText={errors.senhaConfirm?.message}
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
