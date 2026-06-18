import {
	BrButton,
	BrInput,
	BrTextarea,
	BrUpload,
} from "@govbr-ds/react-components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import type { iPublicacaoForm } from "../interfaces/iPublicacaoForm";

export default function Register() {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	function handleData(data: iPublicacaoForm) {
		const imagem = data.imagem?.[0];

		console.log(imagem);
		console.log(data);
	}
	return (
		<form
			onSubmit={handleSubmit(handleData)}
			className="d-flex flex-col gap-4"
		>
			<BrInput
				label="Titulo da Publicação"
				placeholder="Digite o título da sua publicação"
				{...register("titulo")}
				status={errors.titulo ? "danger" : undefined}
				feedbackText={errors.titulo?.message}
				required
			/>
			<BrTextarea
				label="Conteúdo da Publicação"
				placeholder="Digite o conteúdo da sua publicação"
				{...register("descricao")}
				status={errors.descricao ? "danger" : undefined}
				feedbackText={errors.descricao?.message}
			/>
			<Controller
				name="imagem"
				control={control}
				render={({ field }) => (
					<BrUpload
						label="Imagem"
						maxFiles={1}
						accept=".jpg,.jpeg,.png"
						maxFileSize={5 * 1024 * 1024}
						onChange={(files) => field.onChange(files)}
					/>
				)}
			/>

			<BrButton
				primary
				type="submit"
			>
				Publicar
			</BrButton>
		</form>
	);
}
