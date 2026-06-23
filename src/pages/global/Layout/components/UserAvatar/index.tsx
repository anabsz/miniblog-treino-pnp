import { BrAvatar, BrButton, BrNotification } from "@govbr-ds/react-components";
import type { UserAvatarProps } from "./interfaces";

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
