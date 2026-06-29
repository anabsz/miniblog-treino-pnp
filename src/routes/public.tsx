import LoginPage from "../pages/modules/Login";
import UsuarioCadastroPage from "../pages/modules/UsuarioCadastro";

export const publicRoutes = [
	{
		path: "cadastro",
		element: <UsuarioCadastroPage />,
	},
	{
		path: "login",
		element: <LoginPage />,
	},
];
