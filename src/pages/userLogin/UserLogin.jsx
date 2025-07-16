import styles from "./UserLogin.module.css";
import LogoParkify from "@/components/atoms/logoParkify/LogoParkify";
import SignIn from "@/components/organisms/signIn/SignIn";

const UserLogin = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <SignIn />
        </div>

        <div className={styles.rightPanel}>
          <h2 className={styles.welcomeText}>Bienvenidos a</h2>
          <LogoParkify />
          <p className={styles.subtitle}>Sistema de gestion parqueadero</p>

          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-map-pin-icon lucide-map-pin"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <p>Medellin, colombia</p>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-phone-call-icon lucide-phone-call"
                >
                  <path d="M13 2a9 9 0 0 1 9 9" />
                  <path d="M13 6a5 5 0 0 1 5 5" />
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
              </span>
              <p>+57 3122222222</p>
            </div>
          </div>

          <img
            src="./src/assets/parking-info.svg"
            className={styles.parking}
            alt="parking icon"
          />
          <footer className={styles.footer}>
            © 2025 desarrollado por stivcode
          </footer>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
