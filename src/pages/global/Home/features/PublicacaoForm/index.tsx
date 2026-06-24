import {
	BrButton,
	BrInput,
	BrTextarea,
	BrUpload,
} from "@govbr-ds/react-components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import type { PublicacaoSubmit } from "../../../../../interfaces/Publicacao";
import type { PublicacaoFormProps } from "../../interfaces";
import { publicacaoSchema } from "./schema";
import PublicacaoService from "../../../../../services/models/PublicacaoService";

export default function PublicacaoForm(
	props: PublicacaoFormProps
): React.ReactNode {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [loading, setLoading] = useState(false);

	// -----------------------------
	// Hooks do React e Form
	// -----------------------------
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(publicacaoSchema),
	});

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	async function handleData(data: PublicacaoSubmit) {
		setLoading(true);

		try {
			const payload: PublicacaoSubmit = {
				titulo: data.titulo,
				descricao: data.descricao,
				imagem: data.imagem ? data.imagem : undefined,
			};
			const response = await PublicacaoService.post(payload);
			props.onSuccess(response);
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage =
					error.response.data?.message || "Erro ao criar publicação!";
				props.onError(errorMessage);
			} else {
				props.onError("Erro ao criar publicação!");
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
						helpText={errors.imagem?.message}
						label="Imagem"
						maxFiles={1}
						accept=".jpg,.jpeg,.png"
						maxFileSize={5 * 1024 * 1024}
						onChange={(files) => field.onChange(files[0])}
					/>
				)}
			/>

			<BrButton
				primary
				type="submit"
				disabled={loading}
			>
				{loading ? "Publicando..." : "Publicar"}
			</BrButton>
		</form>
	);
}
