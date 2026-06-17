import AutocadastroPage from "../features/Autocadastro";
import LoginPage from "../features/Login";

export const publicRoutes = [
	{
		path: "cadastro",
		element: <AutocadastroPage />,
	},
	{
		path: "login",
		element: <LoginPage />,
	},
];
