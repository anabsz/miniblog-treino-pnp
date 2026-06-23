import {
	BrAvatar,
	BrButton,
	BrHeader,
	BrNotification,
} from "@govbr-ds/react-components";
import { useAuthState } from "../states/useAuthStates";
import { Outlet, useNavigate } from "react-router";

export default function Layout() {
	const navigate = useNavigate();
	const auth = useAuthState((state) => state.accessToken);

	function isLogged(): boolean {
		return auth ? true : false;
	}

	function logout() {
		useAuthState.getState().logout();
	}

	function handleOnLogin() {
		navigate("/login");
	}

	function redirectToHome() {
		navigate("/");
	}

	function userAvatar() {
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
								onClick: logout,
							},
						]}
						title="Fulano de Town"
					/>
				}
				icon="chevron-down"
			>
				<BrAvatar
					src="https://picsum.photos/id/823/400"
					type="image"
				/>
			</BrButton>
		);
	}

	return (
		<div>
			<BrHeader
				features={null}
				menuId="main-navigation"
				onClickLogin={handleOnLogin}
				onSearch={function Dc() {}}
				quickAccessLinks={[
					{
						label: "Inicio",
						onClick: redirectToHome,
					},
				]}
				loggedIn={isLogged()}
				avatar={isLogged() ? userAvatar() : undefined}
				showMenuButton
				showSearchBar
				signature="PNP"
				subTitle="EM DESENVOLVIMENTO PRECÁRIO"
				title="Meu Belo Miniblog"
				urlLogo="https://www.gov.br/ds/assets/img/govbr-logo.png"
			/>
			<main className="container">
				<Outlet />
			</main>
		</div>
	);
}
