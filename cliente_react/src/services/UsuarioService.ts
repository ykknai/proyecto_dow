import { safeParse } from "valibot";
import { PasswordFormSchema, UsuarioFormSchema } from "../types/usuario";
import axios from "../services/axiosInstance";

type UsuarioFormDataType = {
  [k: string]: FormDataEntryValue;
};

type PasswordFormDataType = {
  [k: string]: FormDataEntryValue;
};

export async function crearUsuario(formData: UsuarioFormDataType) {
  try {
    const resultado = safeParse(UsuarioFormSchema, formData);
    if (resultado.success) {
      const url = `${import.meta.env.VITE_API_URL}/usuarios/register`;
      await axios.post(url, {
        email: resultado.output.email,
        password: resultado.output.password,
      });
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
        success: false,
        error: "Error. Ocurrió un problema con los datos ingresados x.x",
        dicErrores: dicErrores,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error ?? "Error, No se logró crear el usuario x.x",
    };
  }
}

export async function iniciarSesion(formData: UsuarioFormDataType) {
  try {
    const resultado = safeParse(UsuarioFormSchema, formData);
    if (resultado.success) {
      const url = '/usuarios/login';
      /*await axios.post(url, {
        email: resultado.output.email,
        password: resultado.output.password,
      });*/
      const { data } = await axios.post(url,resultado.output)
      localStorage.setItem('token',data.token)
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
        success: false,
        error: "Error. Ocurrió un problema con los datos ingresados x.x",
        dicErrores: dicErrores,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error ?? "Error, No se logró Iniciar sesión en el Sistema x.x",
    };
  }
}

export async function cambiarPassword(formData: PasswordFormDataType) {
  try {
    const resultado = safeParse(PasswordFormSchema, formData);
    if (resultado.success) {
      const url = '/usuarios/cambiar';
      await axios.put(url, {
        actualP: resultado.output.actualP,
        nuevaP: resultado.output.nuevaP,
        confirmarP: resultado.output.confirmarP,
      });
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
        success: false,
        error: "Error. Ocurrió un problema con los datos ingresados x.x",
        dicErrores: dicErrores,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error ?? "Error, No se logró cambiar la contraseña del usuario x.x",
    };
  }
}
