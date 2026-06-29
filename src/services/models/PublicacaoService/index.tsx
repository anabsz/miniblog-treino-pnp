import type { PublicacaoSubmit } from "../../../interfaces/Publicacao";
import { useAuthStore } from "../../../stores/useAuthStore";
import { axiosInstance } from "../../commom/axiosInstance";
import { getAuthHeaders } from "../../commom/headers";

export default class PublicacaoService {
	static async get() {
		const response = await axiosInstance.get("/publicacao/");
		return response.data;
	}

	static async getById(id: number) {
		const response = await axiosInstance.get(`/publicacao/${id}/`);
		return response.data;
	}

	static async post(data: PublicacaoSubmit) {
		const response = await axiosInstance.post("/publicacao/", data, {
			headers: getAuthHeaders(useAuthStore.getState().accessToken),
		});
		return response.data;
	}

	static async getComentarios(id: number) {
		const response = await axiosInstance.get(`/publicacao/${id}/comentarios/`);
		return response.data;
	}
}
