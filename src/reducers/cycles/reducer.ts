import { produce } from "immer";
import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date; //data que o ciclo iniciou
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CycleState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      //sem o immer
      // return { 
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // };
      //usando producer do immer
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      //sem o immer
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       //... pega todos os dados e adiciona o  interruptedDate:new Date()
      //       return { ...cycle, interruptedDate: new Date() };
      //     } else {
      //       return cycle;
      //     }
      //   }),
      //   activeCycleId: null,
      // };
      //com o immer
      const currentCycleindex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });
      if (currentCycleindex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleindex].interruptedDate = new Date();
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      //mesmo codigo que interrupted sem o immer
      //e o msm com o immer mudando apenas finishedDate
      const currentCycleindex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });
      if (currentCycleindex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleindex].finishedDate = new Date();
      });
    }
    default:
      return state;
  }
}
