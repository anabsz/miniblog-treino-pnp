import { BrAvatar, BrButton, BrNotification } from "@govbr-ds/react-components";
import type { UserAvatarProps } from "./interfaces";

/**
 * Componente responsável por exibir o avatar do usuário autenticado.
 *
 * @param {UserAvatarProps} props
 *
 * @param {string} [props.userProfilePicture]
 * URL da imagem de perfil do usuário.
 * Caso não seja informada, uma imagem padrão será exibida.
 *
 * @param {() => void} props.onClick
 * Função executada ao clicar na opção "Sair".
 *
 * @returns {React.ReactNode}
 * Avatar do usuário com menu de ações.
 *
 * @example
 * ```tsx
 * <UserAvatar
 *   userProfilePicture={usuario.foto}
 *   onClick={() => logout()}
 * />
 * ```
 *
 * @author
 *   @anabsz
 */
export default function UserAvatar(props: UserAvatarProps): React.ReactNode {
	return (
		<BrButton
			circle
			closeIcon="chevron-up"
			dropdownDirection="left"
			dropdownItems={
				<BrNotification
					items={[
						{
							closeOnClick: true,
							content: "Sair",
							icon: "sign-out-alt",
							isCenter: true,
							isDanger: true,
							onClick: props.onClick,
						},
					]}
					title="Fulano de Town"
				/>
			}
			icon="chevron-down"
		>
			<BrAvatar
				src={
					props.userProfilePicture
						? props.userProfilePicture
						: "https://i.metroimg.com/J_PRBb2Rg7FuFQFpPc-Kz8pKzG27_rmgY19VZMJj2x4/w:1200/q:85/f:webp/plain/https://images.metroimg.com/2022/09/28093838/caneta-azul-hit.jpg"
				}
				type="image"
			/>
		</BrButton>
	);
}
