import CadastrarComentario from "../features/CadastrarComentario";
import DetalharPublicacao from "../features/DetalharPublicacao";

export default function PublicacaoPage() {
	return (
		<div className="d-flex flex-col gap-4 max-w-2xl mx-auto my-4">
			<DetalharPublicacao />
			<h2 className="my-0">Comentários</h2>
			<CadastrarComentario />
		</div>
	);
}
