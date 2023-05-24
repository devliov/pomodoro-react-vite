import "styled-components";
import { defaultThemes } from "../styles/themes/default";

type ThemeType = typeof defaultThemes;

declare module "styled-components" {
  export type DefaultTheme = ThemeType
}

// yarn add styled-components  na raiz do projeto
// yarn add @types/styled-components -D
