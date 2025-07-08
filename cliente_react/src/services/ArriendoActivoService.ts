import axios from "../services/axiosInstance";
import { ArriendosActivosSchema } from "../types/arriendo";
import { safeParse } from "valibot";

export async function getArriendosActivos() {
  try {
    const url = "/arriendos/activos";
    const { data: arriendos } = await axios.get(url);
    const resultado = safeParse(ArriendosActivosSchema, arriendos.data);
    if (resultado.success) {
      return resultado.output;
    } else {
      throw new Error("Hubo un inconveniente en la recolección de data x.x");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function finalizarArriendo(arriendoId: number) {
  try {
    const url = `/arriendos/devolucion/${arriendoId}`;
    const { data: arriendos } = await axios.put(url, {});
    const resultado = safeParse(ArriendosActivosSchema, arriendos.data);
    if (resultado.success) {
      return resultado.output;
    } else {
      throw new Error("Hubo un inconveniente en la recolección de data x.x");
    }
  } catch (error) {
    console.log(error);
  }
}
