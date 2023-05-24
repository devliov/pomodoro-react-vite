import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

import {
  addNewCycleAction,
  interrupedCurrentCycleAction,
  markCurrenteCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  // setAmountSecondPassed: React.Dispatch<React.SetStateAction<number>>;
  markCurrentCycleFinished: () => void;
  setSecondsPassed: (second: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  //usar user reducer quando estado armazenar informacoes complexas e o estado precisa mudar constantemente por varias acoes diferentes
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        "@pomodoro:cycles-state-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
      return initialState
    },
  );

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@pomodoro:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  // ciclo ativo pelo id

  const createNewCycle = (data: CreateCycleData) => {
    //id unico gerado na hora que o ciclo é criado e pode ser usado na key em caso de lista boa ideia
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  };

  function markCurrentCycleFinished() {
    dispatch(markCurrenteCycleAsFinishedAction());
  }

  const interruptCurrentCycle = () => {
    dispatch(interrupedCurrentCycleAction());
  };

  const setSecondsPassed = (second: number) => {
    setAmountSecondsPassed(second);
  };

  return (
    <CyclesContext.Provider
      value={{
        cycles: cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
