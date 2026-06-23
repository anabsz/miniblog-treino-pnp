import { BrButton, BrInput } from "@govbr-ds/react-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { schema } from "./schema";
import type {
	iComentarioForm,
	iComentarioSubmit,
} from "../../../interfaces/iComentarios";
import ComentarioService from "../../../services/models/ComentarioService";
import type { CadastraComentariosProps } from "../interfaces/CadastraComentariosProps";
import { useState } from "react";

export default function Register(props: CadastraComentariosProps) {
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	async function handleData(data: iComentarioForm) {
		setLoading(true);
		try {
			const payload: iComentarioSubmit = {
				publicacao: props.publicacaoId,
				mensagem: data.mensagem,
			};
			const response = await ComentarioService.post(payload);
			props.onSuccess(response);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				if (error.response.status === 400 && error.response.data.mensagem) {
					setError("mensagem", {
						type: "server",
						message:
							error.response.data.mensagem[0] ?? "Erro ao enviar comentário",
					});
				}
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			className="d-flex flex-col gap-4"
			onSubmit={handleSubmit(handleData)}
		>
			<BrInput
				label="Mensagem"
				{...register("mensagem")}
				status={errors.mensagem ? "danger" : undefined}
				feedbackText={errors.mensagem?.message}
			/>
			<BrButton
				primary
				type="submit"
				className="w-full! mx-auto"
				disabled={loading}
			>
				Enviar
			</BrButton>
		</form>
	);
}
