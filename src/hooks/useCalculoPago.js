import { useEffect, useState } from "react";

const useCalculoPago = (fechaHoraIngreso) => {
  const [valor, setValor] = useState("...");
  const tarifaPorHora = 1500;

  useEffect(() => {
    if (!fechaHoraIngreso) return;

    const ingreso = new Date(fechaHoraIngreso); // ya viene en formato 'YYYY-MM-DD HH:mm'

    const ahora = new Date(); // tiempo actual
    const diferenciaMs = ahora - ingreso;

    if (diferenciaMs < 0) {
      setValor("$0");
      return;
    }

    const totalMinutos = Math.floor(diferenciaMs / 1000 / 60);
    const dias = Math.floor(totalMinutos / (60 * 24));
    const horas = Math.floor((totalMinutos % (60 * 24)) / 60);
    const minutos = totalMinutos % 60;

    let totalHoras = dias * 24 + horas;
    if (minutos > 0) totalHoras += 1;

    const total = totalHoras * tarifaPorHora;

    const formateado = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(total);

    setValor(formateado);
  }, [fechaHoraIngreso]);

  return valor;
};

export default useCalculoPago;
