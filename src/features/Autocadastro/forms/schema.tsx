import * as yup from "yup";

export const schema = yup.object().shape({
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
