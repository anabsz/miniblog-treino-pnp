import { BrButton, BrInput } from "@govbr-ds/react-components";

export default function Register() {
	return (
		<form className="d-flex flex-col gap-4">
			<BrInput label="Mensagem" />
			<BrButton
				primary
				type="submit"
				className="w-full! mx-auto"
			>
				Enviar
			</BrButton>
		</form>
	);
}
