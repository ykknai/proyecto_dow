import { safeParse } from "valibot";
import { ArriendoFormSchema } from "../types/arriendo";
import axios from "../services/axiosInstance";

type ArriendoFormDataType = {
  [k: string]: FormDataEntryValue;
};

export async function crearArriendo(formData: ArriendoFormDataType) {
  try {
    const resultado = safeParse(ArriendoFormSchema, formData);
    if (resultado.success) {
      const url = "/arriendos";
      await axios.post(url, {
        nombreCliente: resultado.output.nombreCliente,
        patenteVehiculo: resultado.output.patenteVehiculo,
        rutCliente: resultado.output.rutCliente,
        tipoVehiculo: resultado.output.tipoVehiculo,
      });
      console.log(typeof resultado.output.tipoVehiculo);
      return { success: true };
    } else {
      // Crear diccionario para los errores
      const dicErrores: Record<string, string[]> = {};

      for (const issue of resultado.issues) {
        const campo = issue.path![0].key as string;
        if (!dicErrores[campo]) {
          dicErrores[campo] = [];
        }
        dicErrores[campo].push(issue.message);
      }
      return {
        succes: false,
        error: "Error. Ocurrió un problema con los datos ingresados x.x",
        dicErrores: dicErrores,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error ?? "Error, No se logró crear el arriendo x.x",
    };
  }
}
