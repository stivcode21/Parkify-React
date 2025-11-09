export function formatDateTime(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("es-ES", options);
}
