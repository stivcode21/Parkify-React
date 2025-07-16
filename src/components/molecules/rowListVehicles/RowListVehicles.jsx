import styles from "./RowListVehicles.module.css";

const RowListVehicles = ({
  placaID,
  vehiculo,
  fecha,
  casillero,
  selected,
  setSelected,
  history,
  salida,
  pago,
}) => {
  return (
    <tr
      onClick={() => setSelected(placaID)}
      className={selected === placaID ? styles.selected : ""}
    >
      {history ? (
        <>
          <td>{placaID}</td>
          <td>{vehiculo}</td>
          <td>{fecha}</td>
          <td>{salida}</td>
          <td>{pago}</td>
        </>
      ) : (
        <>
          <td>{placaID}</td>
          <td>{vehiculo}</td>
          <td>{casillero}</td>
          <td>{fecha}</td>
        </>
      )}
    </tr>
  );
};

export default RowListVehicles;
