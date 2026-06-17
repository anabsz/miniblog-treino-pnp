import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import ProtectedRoute from "./protectedRoute";

export const router = createBrowserRouter([
	{
		children: [
			...publicRoutes,
			{
				children: protectedRoutes,
				element: <ProtectedRoute />,
			},
		],
	},
]);
