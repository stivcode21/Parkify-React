import { useEffect, useState } from "react";

const useTiempoTranscurrido = (dateTimeString) => {
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    if (!dateTimeString) return;

    try {
      // Separar la fecha y la hora del string recibido
      const [parteFecha, parteHora] = dateTimeString.split(" ");
      const [anio, mes, dia] = parteFecha.split("-").map(Number);
      const [horas, minutos] = parteHora.split(":").map(Number);

      // Crear la fecha del evento (ajustada manualmente a Bogotá)
      const fechaEvento = new Date(
        Date.UTC(anio, mes - 1, dia, horas + 5, minutos)
      );

      // Obtener fecha actual en zona Bogotá
      const ahora = new Date();
      const ahoraBogota = new Date(
        ahora.toLocaleString("en-US", { timeZone: "America/Bogota" })
      );

      const diferenciaMs = ahoraBogota - fechaEvento;

      if (diferenciaMs < 0) {
        setResultado("En el futuro 🕒");
        return;
      }

      const minutosTotales = Math.floor(diferenciaMs / 1000 / 60);
      const dias = Math.floor(minutosTotales / (60 * 24));
      const horasTranscurridas = Math.floor((minutosTotales % (60 * 24)) / 60);
      const minutosTranscurridos = minutosTotales % 60;

      let texto = "";
      if (dias > 0) texto += `${dias} día${dias !== 1 ? "s" : ""}`;
      if (horasTranscurridas > 0)
        texto += `${texto ? " - " : ""}${horasTranscurridas} hora${
          horasTranscurridas !== 1 ? "s" : ""
        }`;
      if (minutosTranscurridos > 0)
        texto += `${texto ? " - " : ""}${minutosTranscurridos} minuto${
          minutosTranscurridos !== 1 ? "s" : ""
        }`;
      if (!texto) texto = "menos de 1 minuto";

      setResultado(texto);
    } catch (error) {
      console.error("Error al procesar la fecha:", error);
      setResultado("Formato de fecha no válido");
    }
  }, [dateTimeString]);

  return resultado;
};

export default useTiempoTranscurrido;
