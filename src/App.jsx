import AppRouter from "./routing/AppRouter";
import { NotificationProvider } from "@/components/templates/notificationProvider/notificationProvider";

function App() {
  return (
    <NotificationProvider>
      <AppRouter />
    </NotificationProvider>
  );
}

export default App;
