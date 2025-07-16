import { useState } from "react";

const useClickDateTime = () => {
  const [dateTime, setDateTime] = useState("");

  const handleClick = () => {
    const now = new Date();

    // Formatear la fecha
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    // Formatear la hora
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // Crear el string en el formato deseado
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    setDateTime(formattedDateTime);
  };

  return [dateTime, handleClick];
};

export default useClickDateTime;
