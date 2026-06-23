import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";

export default function ProtectedRoute() {
	const token = useAuthStore((state) => state.accessToken);
	return token ? <Outlet /> : <Navigate to="/login" />;
}
