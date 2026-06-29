import type { ComentarioSubmit } from "../../../interfaces/Comentario";
import { useAuthStore } from "../../../stores/useAuthStore";
import { axiosInstance } from "../../commom/axiosInstance";
import { getAuthHeaders } from "../../commom/headers";

export default class ComentarioService {
	static async get() {
		const response = await axiosInstance.get("/comentario/");
		return response.data;
	}

	static async getById(id: number) {
		const response = await axiosInstance.get(`/comentario/${id}/`);
		return response.data;
	}
	static async post(data: ComentarioSubmit) {
		console.log(useAuthStore.getState());
		const response = await axiosInstance.post("/comentario/", data, {
			headers: getAuthHeaders(useAuthStore.getState().accessToken),
		});
		return response.data;
	}
}
