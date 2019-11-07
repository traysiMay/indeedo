import React, { useReducer } from "react";
import {
  POP_BUBBLE,
  ADD_BUBBLE,
  UPDATE_VELOCITY,
  TIMER_TICK,
  BEGIN_GAME
} from "./actions";
import { getRandomInt } from "./utils";

export const BubbleContext = React.createContext();
const begin = false;

const bubbles = [];

const poppedBubbles = [];

const ids = [];

const velocity = 50;

const score = 0;

const timer = 60;

const gameOver = false;

const bubbleReducer = (state, action) => {
  switch (action.type) {
    case BEGIN_GAME:
      return { ...state, begin: true };
    case ADD_BUBBLE:
      const id = state.ids.length;
      let size = getRandomInt(10, 100);
      let x = getRandomInt(0, 500);
      if (x + size > 500) {
        x = 497 - size;
      } else if (x - size <= 0) {
        x = 3 + size;
      }
      const newBubble = {
        id,
        x,
        y: 0,
        size,
        popped: false
      };
      const bubbles = [...state.bubbles, newBubble];
      const ids = [...state.ids, id];
      return { ...state, bubbles, ids };
    case POP_BUBBLE:
      if (state.poppedBubbles.includes(action.id)) return state;
      const score = state.score + action.points;
      const poppedBubbles = [...state.poppedBubbles, action.id];
      const bubblesPopped = state.bubbles.map(b => {
        if (b.id === action.id) {
          return { ...b, popped: true };
        } else {
          return b;
        }
      });
      return { ...state, bubbles: bubblesPopped, poppedBubbles, score };
    case UPDATE_VELOCITY:
      const { velocity } = action;
      return { ...state, velocity };
    case TIMER_TICK:
      const timer = state.timer - 1;
      const gameOver = timer === 0 ? true : false;
      return { ...state, timer, gameOver };
    default:
      return state;
  }
};

const initialState = {
  begin,
  ids,
  bubbles,
  poppedBubbles,
  velocity,
  score,
  timer,
  gameOver
};

const BubbleProvider = ({ children }) => {
  const [bubblesState, bubbles_dispatch] = useReducer(
    bubbleReducer,
    initialState
  );

  return (
    <BubbleContext.Provider value={{ bubblesState, bubbles_dispatch }}>
      {children}
    </BubbleContext.Provider>
  );
};

export default BubbleProvider;
