import * as yup from "yup";

export const usuarioSchema = yup.object().shape({
	nome: yup.string().required("O nome é obrigatório"),
	username: yup.string().required("O nome de usuário é obrigatório"),
	senha: yup
		.string()
		.min(6, "A senha deve conter no mínimo 6 caracteres")
		.required("A senha é obrigatória"),
	senhaConfirm: yup
		.string()
		.oneOf([yup.ref("senha"), undefined], "As senhas não coincidem")
		.required("A confirmação da senha é obrigatória"),
});
