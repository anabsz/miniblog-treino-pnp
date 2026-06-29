import type { PublicacaoSearchProps } from "./interfaces";

export default function PublicacaoSearch(
	props: PublicacaoSearchProps
): React.ReactNode {
	return (
		<input
			type="text"
			value={props.value}
			onChange={(e) => props.onChange(e.target.value)}
			placeholder="Pesquisar publicação..."
			className="br-input"
		/>
	);
}
