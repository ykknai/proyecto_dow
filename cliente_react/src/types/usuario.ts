import {
  email,
  maxLength,
  minLength,
  nonEmpty,
  object,
  pipe,
  string,
  toLowerCase,
} from "valibot";

export const UsuarioFormSchema = object({
  email: pipe(
    string(),
    nonEmpty("Indique el correo del usuario."),
    email("Debe ingresar un correo válido."),
    toLowerCase()
  ),
  password: pipe(
    string(),
    nonEmpty("Indique la contraseña del usuario."),
    minLength(6, "contraseña minimo 6 caracteres"),
    maxLength(60, "contraseña no más de 60 caracteres.")
  ),
});

export const PasswordFormSchema = object({
  actualP: pipe(
    string(),
    nonEmpty("Indique la contraseña del usuario."),
    minLength(6, "contraseña minimo 6 caracteres"),
    maxLength(60, "contraseña no más de 60 caracteres.")
  ),
  nuevaP: pipe(
    string(),
    nonEmpty("Indique la contraseña del usuario."),
    minLength(6, "contraseña minimo 6 caracteres"),
    maxLength(60, "contraseña no más de 60 caracteres.")
  ),
  confirmarP: pipe(
    string(),
    nonEmpty("Indique la contraseña del usuario."),
    minLength(6, "contraseña minimo 6 caracteres"),
    maxLength(60, "contraseña no más de 60 caracteres.")
  ),
});
