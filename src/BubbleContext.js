import React, { useReducer } from "react";
import { POP_BUBBLE, ADD_BUBBLE } from "./actions";
import { getRandomInt } from "./utils";

export const BubbleContext = React.createContext();

const bubbles = [];

const poppedBubbles = [];

const ids = [];

const velocity = 1;

const bubbleReducer = (state, action) => {
  switch (action.type) {
    case ADD_BUBBLE:
      const id = state.ids.length;
      let size = getRandomInt(10, 100);
      let x = getRandomInt(0, 500);
      if (x + size > 500) {
        x = 499 - size;
      } else if (x - size <= 0) {
        x = 1 + size;
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
      const poppedBubbles = [...state.poppedBubbles, action.id];
      const bubblesPopped = state.bubbles.map(b => {
        if (b.id === action.id) {
          return { ...b, popped: true };
        } else {
          return b;
        }
      });
      return { ...state, bubbles: bubblesPopped, poppedBubbles };
    default:
      return state;
  }
};

const initialState = { ids, bubbles, poppedBubbles, velocity };

const BubbleProvider = ({ children }) => {
  const [bubblez, bubbles_dispatch] = useReducer(bubbleReducer, initialState);

  return (
    <BubbleContext.Provider value={{ bubblez, bubbles_dispatch }}>
      {children}
    </BubbleContext.Provider>
  );
};

export default BubbleProvider;
