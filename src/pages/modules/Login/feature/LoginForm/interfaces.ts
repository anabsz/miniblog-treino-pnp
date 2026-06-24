// -------------------------------
// Interfaces do Formulário
// -------------------------------
export interface LoginForm {
	username: string;
	password: string;
}

// -------------------------------
// Interfaces de Props
// -------------------------------
export interface LoginFormProps {
	onSuccess: (message: string) => void;
	onError: (message: string) => void;
}
