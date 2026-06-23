import type { PublicacaoSubmit } from "../../../interfaces/Publicacao";
import { useAuthStore } from "../../../stores/useAuthStore";
import { axiosInstance } from "../../commom/axiosInstance";

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
		console.log(useAuthStore.getState());
		const response = await axiosInstance.post("/publicacao/", data, {
			headers: {
				Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	}

	static async getComentarios(id: number) {
		const response = await axiosInstance.get(`/publicacao/${id}/comentarios/`);
		return response.data;
	}
}
