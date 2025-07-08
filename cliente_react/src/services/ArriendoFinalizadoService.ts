import axios from "../services/axiosInstance";
import { safeParse } from "valibot";
import { ArriendosFinalizadosSchema } from "../types/arriendo";

export async function getArriendosFinalizados() {
  try {
    const url = "/arriendos/finalizados";
    const { data: arriendos } = await axios.get(url);
    const resultado = safeParse(ArriendosFinalizadosSchema, arriendos.data);
    if (resultado.success) {
      return resultado.output;
    } else {
      throw new Error("Hubo un inconveniente en la recolección de data x.x");
    }
  } catch (error: any) {
    console.log(error);
  }
}

export async function borrarArriendo(arriendoId: number) {
  try {
    const url = `/arriendos/${arriendoId}`;
    await axios.delete(url);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.error ?? "No se logró eliminar el arriendo x.x",
    };
  }
}
