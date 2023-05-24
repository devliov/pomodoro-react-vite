import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
//npm install react-hook-form
//para nao precisar fazer a validacao diretamente com js

import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";
//npm install zod para manipular o hookform

export function NewCycleFrom() {
  const { activeCycle } = useContext(CyclesContext);

  //useFormContext() só funciona quando tem um <FormProvider> em volta do componente neste caso o componente é NewCycleForm
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Jogo 1" />
        <option value="Task 1" />
      </datalist>

      <label htmlFor="minutesAmout"> durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
