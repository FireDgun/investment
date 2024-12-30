import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./router/Router";
import { LanguageProvider } from "./providers/LanguageProvider";
import ShowBlackScreenForPeriodOfTimeProvider from "./providers/ShowBlackScreenForPeriodOfTimeProvider";

function App() {
  return (
    <BrowserRouter>
      <ShowBlackScreenForPeriodOfTimeProvider>
        <LanguageProvider>
          <Router />
        </LanguageProvider>
      </ShowBlackScreenForPeriodOfTimeProvider>
    </BrowserRouter>
  );
}

export default App;
