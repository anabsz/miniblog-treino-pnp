import * as yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const publicacaoSchema = yup.object({
	titulo: yup
		.string()
		.required("O título é obrigatório")
		.max(400, "O título deve ter no máximo 400 caracteres"),

	descricao: yup
		.string()
		.required("A descrição é obrigatória")
		.max(1200, "A descrição deve ter no máximo 1200 caracteres"),

	imagem: yup
		.mixed<File>()
		.optional()
		.test(
			"fileSize",
			"O arquivo é muito grande (máx 5MB)",
			(file) => !file || file.size <= FILE_SIZE
		)
		.test(
			"fileFormat",
			"Formato não suportado (apenas JPG ou PNG)",
			(file) => !file || SUPPORTED_FORMATS.includes(file.type)
		),
});
