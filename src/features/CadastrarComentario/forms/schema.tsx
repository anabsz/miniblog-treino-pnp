import * as yup from "yup";

export const schema = yup.object().shape({
	mensagem: yup
		.string()
		.required("A mensagem é obrigatória")
		.max(400, "A mensagem deve conter no máximo 400 caracteres"),
});
