import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutConatiner } from "./styles";

export function DefaultLayout() {
  return (
    <div>
      <LayoutConatiner>
      <Header />
      <Outlet />
      </LayoutConatiner>
    </div>
  );
}

//outlet onde o conteudo especifico da path é direcionado quando navegado
