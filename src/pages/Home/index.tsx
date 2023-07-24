import { HandPalm, Play } from "phosphor-react";

import { useContext } from "react";

import {
  HomeContainer,
  StartCountdowmButton,
  StopCountdowmButton,
} from "./styles";

import { NewCycleFrom } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
//npm install zod para manipular o hookform
import * as zod from "zod";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  owner: zod.string().optional(),
  minutesAmount: zod
    .number()
    .min(1, "Duração de no mínimo 5 minutos")
    .max(60, "Duração de no máximo 60 minutos"),
});

// interface NewCicleFormData {
//   task: string;
//   minutesAmount: number;
// }
// ao inves de usar a interface voce usa zode.infer e usa type of no zode.object
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      //valores orignais vazios para o reset() funcionar
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data);
    reset();
  };

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleFrom />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdowmButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdowmButton>
        ) : (
          <StartCountdowmButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdowmButton>
        )}
      </form>
    </HomeContainer>
  );
}
// lib @hookform/resolver  integracao do zod tipo uma dependencia
//lib de validacao de formulario zod mais abragente com typescript

//controlled  manter em tempo real a informacao dentro do estado do da aplicacao e renderiza toda vez que um input é acionado
// uncontrolled mais indicado para pages com muitos inputs para a pagina so ser renderizada quando o formulario form concluido submit

/**
 * function register(name:string){
 * return {
 * onChange:()=>void;
 * onBlur:()=>void;
 * onFocus:()=>void;
 *    }
 * }
 *
 */
