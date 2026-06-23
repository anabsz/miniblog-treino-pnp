import { Outlet } from "react-router";
import { useAuthStore } from "../../../stores/useAuthStore";
import { Link } from "react-router";
import UserAvatar from "./components/UserAvatar";

export default function Layout(): React.ReactNode {
	// -----------------------------
	// Estados Locais
	// -----------------------------
	const auth = useAuthStore((state) => state.accessToken);

	// -----------------------------
	// Funcões Auxiliares
	// -----------------------------
	function isLogged(): boolean {
		return auth ? true : false;
	}

	function logout() {
		useAuthStore.getState().logout();
	}

	return (
		<div>
			<nav className="br-header flex justify-between align-center">
				<Link to="/">
					<img
						src="https://www.gov.br/ds/assets/img/govbr-logo.png"
						alt="Logo do Governo Federal"
					/>
				</Link>
				(
				{isLogged() ? (
					<UserAvatar onClick={logout} />
				) : (
					<Link to="/login">Entrar</Link>
				)}
				)
			</nav>
			<main className="container">
				<Outlet />
			</main>
		</div>
	);
}
