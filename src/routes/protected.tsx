import DetalharPublicacao from "../features/DetalharPublicacao";
import HomePage from "../pages/Home";
import Layout from "../pages/layout";

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
				element: <DetalharPublicacao />,
			},
		],
	},
];
