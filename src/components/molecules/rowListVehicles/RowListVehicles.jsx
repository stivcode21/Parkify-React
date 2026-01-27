import VehicleExit from "../../organisms/vehicleExit/VehicleExit";
import styles from "./RowListVehicles.module.css";

const RowListVehicles = ({
  placaID,
  vehiculo,
  fecha,
  casillero,
  selected,
  setSelected,
  onRowClick,
  history,
  salida,
  pago,
}) => {
  const isClickable = Boolean(setSelected || onRowClick);
  const handleClick = () => {
    if (setSelected) setSelected(placaID);

    if (onRowClick) onRowClick();
  };

  return (
    <tr
      onClick={isClickable ? handleClick : undefined}
      className={`${styles.container} ${selected === placaID ? styles.selected : ""} ${
        isClickable ? styles.clickable : ""
      }`}
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
          <td className={styles.exitCell} onClick={(e) => e.stopPropagation()}>
            <VehicleExit isBtn={true} placaEntry={placaID} />
          </td>
        </>
      )}
    </tr>
  );
};

export default RowListVehicles;
