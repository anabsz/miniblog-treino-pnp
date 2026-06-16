import HomePage from "../features/Home";
import Layout from "../pages/layout";

export const protectedRoutes = [
	{
		element: <Layout />,
		children: [{ path: "/", element: <HomePage /> }],
	},
];
