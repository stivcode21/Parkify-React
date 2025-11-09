// utils/calculatePayment.js
import { getElapsedTime } from "./getElapsedTime.js";

export function calculatePayment(fechaEntrada, tarifaPorHora = 1500) {
  if (!fechaEntrada) return "$0";

  const { dias, horas, minutos } = getElapsedTime(fechaEntrada);

  // Total de horas cobrables
  let totalHoras = dias * 24 + horas;
  if (minutos > 0) totalHoras += 1; // si hay minutos, se cobra la hora completa

  const total = totalHoras * tarifaPorHora;

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(total);
}
