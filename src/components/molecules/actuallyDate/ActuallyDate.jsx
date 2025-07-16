import { useEffect, useState } from "react";
import styles from "./ActuallyDate.module.css";

const ActuallyDate = () => {
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    const date = new Date();

    const opciones = {
      timeZone: "America/Bogota",
    };

    const today = new Date(date.toLocaleString("en-US", opciones));

    const dia = String(today.getDate()).padStart(2, "0");
    const mes = String(today.getMonth() + 1).padStart(2, "0");
    const año = today.getFullYear();

    setFecha(`${dia}/${mes}/${año}`);
  }, []);

  return <p className={styles.date}>{fecha}</p>;
};

export default ActuallyDate;
