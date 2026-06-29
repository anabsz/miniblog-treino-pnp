import HomePage from "../pages/global/Home";
import Layout from "../pages/global/Layout";
import PublicacaoPage from "../pages/modules/Publicacao";

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
