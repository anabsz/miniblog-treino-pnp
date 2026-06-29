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
			<nav className="br-header ">
				<div className="container md:flex block justify-between align-center">
					<Link
						to="/"
						className="flex justify-center align-center gap-2 "
					>
						<img
							src="https://www.gov.br/ds/assets/img/govbr-logo.png"
							alt="Logo do Governo Federal"
						/>
						<h1 className="m-0">Meu Belo Miniblog</h1>
					</Link>
					{isLogged() ? (
						<UserAvatar onClick={logout} />
					) : (
						<Link to="/login">Entrar</Link>
					)}
				</div>
			</nav>
			<main className="container">
				<Outlet />
			</main>
		</div>
	);
}
