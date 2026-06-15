import { BrInput, BrButton } from "@govbr-ds/react-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { iRegisterForm } from "../interfaces/iRegisterForm";

export default function RegisterForm() {
	const schema = yup.object().shape({
		name: yup.string().required("O nome é obrigatório"),
		username: yup.string().required("O nome de usuário é obrigatório"),
		password: yup
			.string()
			.min(6, "A senha deve conter no mínimo 6 caracteres")
			.required("A senha é obrigatória"),
		passwordConfirm: yup
			.string()
			.oneOf([yup.ref("password"), undefined], "As senhas não coincidem")
			.required("A confirmação da senha é obrigatória"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	function handleData(data: iRegisterForm) {
		console.log(data);
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
