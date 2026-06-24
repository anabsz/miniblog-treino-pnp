import { BrButton, BrInput } from "@govbr-ds/react-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import type { ComentarioFormProps, ComentarioFormSubmit } from "./interfaces";
import type { ComentarioSubmit } from "../../../../../interfaces/Comentario";
import { comentarioSchema } from "./schema";
import ComentarioService from "../../../../../services/models/ComentarioService";

/**
 * Componente responsável por exibir o formulário para adicionar comentários.
 *
 * @param {ComentarioFormProps} props
 * ID da Publicação e funções de sucesso e erro.
 *
 * @param {number} props.publicacaoId
 * ID da publicação à qual o comentário pertence.
 *
 * @param {() => void} props.onSuccess
 * Função executada em caso de sucesso ao enviar o comentário.
 *
 * @param {() => void} props.onError
 * Função executada em caso de erro ao enviar o comentário.
 *
 * @returns {React.ReactNode}
 * Formulário para adicionar comentários.
 *
 * @example
 * ```tsx
 * import { ComentarioForm } from "@/ComentarioForm";
 *
 * <ComentarioForm
 *   publicacaoId={1}
 *   onSuccess={() => console.log("Comentário enviado com sucesso!")}
 *   onError={() => console.error("Erro ao enviar comentário")}
 * />
 * ```
 *
 * @author
 *   @anabsz
 */
export default function ComentarioForm(props: ComentarioFormProps) {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const [loading, setLoading] = useState(false);

	// -----------------------------
	// Hooks do React e Form
	// -----------------------------
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(comentarioSchema),
	});

	// -----------------------------
	// Funções Auxiliares
	// -----------------------------
	async function handleData(data: ComentarioFormSubmit) {
		setLoading(true);
		try {
			const payload: ComentarioSubmit = {
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
			className="d-flex flex-col gap-4 p-4"
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
