import type iPublicacao from "../../interfaces/iPublicacao";
import Register from "./forms/register";
import type { IRegisterProps } from "./interfaces/iRegisterProps";

export default function CriarPublicacao(iRegisterProps: IRegisterProps) {
	function handleSuccess(publicacao: iPublicacao) {
		iRegisterProps.onSuccess(publicacao);
	}

	return (
		<div className="p-4">
			<Register onSuccess={handleSuccess} />
		</div>
	);
}
