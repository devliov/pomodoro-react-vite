import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { defaultThemes } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { CyclesContextProvider } from "./contexts/CyclesContext";

export function App() {

  
  return (
    <ThemeProvider theme={defaultThemes}>
      <BrowserRouter>
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}
