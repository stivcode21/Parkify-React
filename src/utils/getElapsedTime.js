// utils/getElapsedTime.js
export function getElapsedTime(fechaEntrada) {
  if (!fechaEntrada) {
    return { dias: 0, horas: 0, minutos: 0, texto: "" };
  }

  // Asegura que funcione con ISO o con formato "DD/MM/YYYY, HH:mm"
  const fecha =
    typeof fechaEntrada === "string" && fechaEntrada.includes("/")
      ? parseCustomDate(fechaEntrada)
      : new Date(fechaEntrada);

  const ahora = new Date();
  const diferenciaMs = ahora - fecha;

  if (isNaN(fecha.getTime()) || diferenciaMs < 0) {
    return { dias: 0, horas: 0, minutos: 0, texto: "Fecha no válida o futura" };
  }

  const totalMinutos = Math.floor(diferenciaMs / 1000 / 60);
  const dias = Math.floor(totalMinutos / (60 * 24));
  const horas = Math.floor((totalMinutos % (60 * 24)) / 60);
  const minutos = totalMinutos % 60;

  let texto = "";
  if (dias > 0) texto += `${dias} día${dias !== 1 ? "s" : ""}`;
  if (horas > 0)
    texto += `${texto ? " - " : ""}${horas} hora${horas !== 1 ? "s" : ""}`;
  if (minutos > 0)
    texto += `${texto ? " - " : ""}${minutos} minuto${
      minutos !== 1 ? "s" : ""
    }`;
  if (!texto) texto = "menos de 1 minuto";

  return { dias, horas, minutos, texto };
}

function parseCustomDate(fechaStr) {
  try {
    const [fechaPart, horaPart] = fechaStr.split(", ");
    const [dia, mes, anio] = fechaPart.split("/").map(Number);
    const [horas, minutos] = horaPart.split(":").map(Number);
    return new Date(anio, mes - 1, dia, horas, minutos);
  } catch {
    return new Date(NaN);
  }
}
