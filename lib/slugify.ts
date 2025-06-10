export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // espacios por guiones
    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '') // quitar símbolos raros
    .replace(/-+/g, '-'); // evitar guiones dobles
}
