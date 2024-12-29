import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./router/Router";
import { LanguageProvider } from "./providers/LanguageProvider";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Router />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
