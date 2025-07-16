import { useEffect, useState } from "react";

const useHoraColombia = () => {
  const [horaActual, setHoraActual] = useState("");

  useEffect(() => {
    const actualizar = () => {
      const ahora = new Date().toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Bogota",
      });
      setHoraActual(ahora);
    };

    actualizar(); // iniciar inmediatamente
    const intervalo = setInterval(actualizar, 60000); // actualizar cada minuto

    return () => clearInterval(intervalo);
  }, []);

  return horaActual;
};

export default useHoraColombia;
