import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routing/AppRouter";
import { NotificationProvider } from "@/components/templates/notificationProvider/notificationProvider";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
