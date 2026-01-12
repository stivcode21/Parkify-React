import styles from "./BoxButtons.module.css";
import ButtonModal from "@/components/atoms/buttonModal/ButtonModal.jsx";
import VehicleEntry from "@/components/organisms/vehicleEntry/VehicleEntry";
import VehicleExit from "@/components/organisms/vehicleExit/VehicleExit";
import VehicleList from "@/components/organisms/vehicleList/VehicleList";
import HistoryLog from "@/components/organisms/historyLog/HistoryLog";
import Lockers from "@/components/organisms/lockers/Lockers";

const BoxButtons = () => {
  return (
    <div className={styles.box}>
      <ButtonModal name="Ingresar Vehiculos" component={<VehicleEntry />} />
      <ButtonModal name="Salida Vehiculos" component={<VehicleExit />} />
      <ButtonModal
        name="Lista Vehiculos"
        path="/list"
        component={<VehicleList showExit={false} />}
      />
      <ButtonModal
        name="Historial"
        path="/history"
        component={<HistoryLog showExit={false} />}
      />
      <ButtonModal name="Casilleros" component={<Lockers />} />
      <ButtonModal name="Salir" exit={true} />
    </div>
  );
};

export default BoxButtons;
