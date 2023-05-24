import { useContext, useEffect } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

/**
 * Props Drilling = quando usamos muitas propriedades apenas para comunicacao entre os componentes
 * Context API = permite compartilharmos informacoes entre varios componetes a mesmo tempo
 */

export function Countdown() {
  //importando o contexto
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    setSecondsPassed,
    markCurrentCycleFinished,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        //lib date-fns
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    //qunado o useEffect for chamado novamente ela reseta o interval anterior
    return () => {
      clearInterval(interval);
    };
    //quando se usa uma variável externa como condicao pro useEffect tende-se a coloca-la como dependencia []
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    setSecondsPassed,
    markCurrentCycleFinished,
  ]);

  // formas de pegar os minutos e segundos
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  //como os segundos serao dividos pelos minutos nao tereao numeros inteiros entao se usa o Math.floor(arredonda o numero para baixo 10.8 = 10) depois vai ter que usar date-fns
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  //transformando os minutos e segundos em strings e adicionando zero na frente quando o numero for menor que 10
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    // if (activeCycle) {
    //   document.title = `${minutes}:${seconds}`;
    // }
    //meu jeito o de cima é o do professor
    document.title = String(
      activeCycle ? `${minutes}:${seconds}` : (document.title = "Pomodoro")
    );
  }, [activeCycle, minutes, seconds]);

  return (
    <CountDownContainer>
      {/* minutes é uma string entao pode ser separada pelo index das letras */}
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
