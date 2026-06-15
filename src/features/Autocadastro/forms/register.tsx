import { BrInput, BrButton } from "@govbr-ds/react-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { iRegisterForm } from "../interfaces/iRegisterForm";
import { registerService } from "../services/registerService";
import axios from "axios";
import { schema } from "./schema";

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<iRegisterForm>({
		resolver: yupResolver(schema),
	});

	async function handleData(data: iRegisterForm) {
		try {
			const registerData = {
				username: data.username,
				nome: data.name,
				senha: data.password,
			};
			const response = await registerService(registerData);
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
				label="Nome"
				{...register("name")}
				status={errors.name ? "danger" : undefined}
				feedbackText={errors.name?.message}
			/>
			<BrInput
				label="Senha"
				type="password"
				{...register("password")}
				status={errors.password ? "danger" : undefined}
				feedbackText={errors.password?.message}
			/>
			<BrInput
				label="Confirmar Senha"
				type="password"
				{...register("passwordConfirm")}
				status={errors.passwordConfirm ? "danger" : undefined}
				feedbackText={errors.passwordConfirm?.message}
			/>
			<div className="d-flex">
				<BrButton
					primary
					type="submit"
					className="w-full! mx-auto"
				>
					Registrar
				</BrButton>
			</div>
		</form>
	);
}
