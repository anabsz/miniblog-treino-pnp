import * as yup from "yup";

export const loginSchema = yup.object().shape({
	username: yup.string().required("O nome de usuário é obrigatório"),
	password: yup
		.string()
		.min(6, "A senha deve conter no mínimo 6 caracteres")
		.required("A senha é obrigatória"),
});
