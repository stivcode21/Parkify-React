import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routing/AppRouter";
import { NotificationProvider } from "@/components/templates/notificationProvider/notificationProvider";
import { LoaderProvider } from "./context/loaderProvider/LoaderProvider";

function App() {
  return (
    <BrowserRouter>
      <LoaderProvider>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </LoaderProvider>
    </BrowserRouter>
  );
}

export default App;
