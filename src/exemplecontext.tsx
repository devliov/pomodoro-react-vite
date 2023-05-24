import { useState, createContext, useContext } from "react";

const CyclesContext = createContext({} as any);

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext);
  return (
    <h1>
      NewCycleForm: {activeCycle}
      <button onClick={() => setActiveCycle((state: number) => state + 1)}>
        Mudar o valor dos exemplos
      </button>
    </h1>
  );
}

function Countdown() {
  const { activeCycle } = useContext(CyclesContext);
  return <h1>Valor do exemplo 2: {activeCycle}</h1>;
}

export function Teste() {
  const [activeCycle, setActiveCycle] = useState(0);

  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycleForm />
        <Countdown />
      </div>
    </CyclesContext.Provider>
  );
}

// setCycles((state) =>
//   state.map((cycle) => {
//     if (cycle.id === activeCycleId) {
//       //... pega todos os dados e adiciona o  interruptedDate:new Date()
//       return { ...cycle, finishedDate: new Date() };
//     } else {
//       return cycle;
//     }
//   })
// );
