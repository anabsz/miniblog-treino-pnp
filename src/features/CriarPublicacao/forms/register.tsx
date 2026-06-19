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
import publicacaoService from "../../../services/models/PublicacaoService";
import type { IRegisterProps } from "../interfaces/iRegisterProps";
import type iPublicacaoSubmit from "../../../interfaces/iPublicacaoSubmit";
import axios from "axios";

export default function Register(iRegisterProps: IRegisterProps) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	async function handleData(data: iPublicacaoForm) {
		try {
			const payload: iPublicacaoSubmit = {
				titulo: data.titulo,
				descricao: data.descricao,
				imagem: data.imagem ? data.imagem[0] : undefined,
			};
			const response = await publicacaoService.post(payload);
			iRegisterProps.onSuccess(response);
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage =
					error.response.data?.message || "Erro ao criar publicação!";
				iRegisterProps.onError(errorMessage);
			} else {
				iRegisterProps.onError("Erro ao criar publicação!");
			}
		}
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
