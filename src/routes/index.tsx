import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./public";

export const router = createBrowserRouter([
    {
        children: publicRoutes,
    },
])