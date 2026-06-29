import type { UsuarioSubmit } from "../../../../../interfaces/Usuario";
import { axiosInstance } from "../../../../../services/commom/axiosInstance";

export const cadastroService = async (data: UsuarioSubmit) => {
	const response = await axiosInstance.post("/cadastrar/", data);
	return response.data;
};
