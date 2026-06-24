import type { Token, UsuarioSubmit } from "../../../../../interfaces/Usuario";

// -----------------------------
// Interface de Submissão do Formulário
// -----------------------------
export interface UsuarioSubmitForm extends UsuarioSubmit {
	senhaConfirm: string;
}

// -----------------------------
// Interface de Props
// -----------------------------
export interface UsuarioCadastroFormProps {
	onSuccess: (response: Token) => void;
}
