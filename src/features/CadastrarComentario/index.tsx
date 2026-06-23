import Register from "./forms/register";
import type { CadastraComentariosProps } from "./interfaces/CadastraComentariosProps";

export default function CadastrarComentario(props: CadastraComentariosProps) {
	return (
		<Register
			publicacaoId={props.publicacaoId}
			onSuccess={props.onSuccess}
		/>
	);
}
