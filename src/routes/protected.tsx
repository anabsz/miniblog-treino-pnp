import HomePage from "../pages/Home";
import Layout from "../pages/layout";
import PublicacaoPage from "../pages/Publicacao";

export const protectedRoutes = [
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/publicacao/:id",
				element: <PublicacaoPage />,
			},
		],
	},
];
