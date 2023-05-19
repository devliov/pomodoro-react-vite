import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { defaultThemes } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";

export function App() {
  return (
    <ThemeProvider theme={defaultThemes}>
      <BrowserRouter>
        <Router />
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}
