import { Navigate, Outlet } from "react-router";
import { useAuthState } from "../states/useAuthStates";

export default function ProtectedRoute() {
	const token = useAuthState((state) => state.accessToken);
	return token ? <Outlet /> : <Navigate to="/login" />;
}
