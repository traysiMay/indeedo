import React, { useReducer } from 'react'

export const BubbleContext = React.createContext()

const bubbles = [
  //   { id: 1, x: 100, y: 0, size: 50 },
  //   { id: 2, x: 200, y: 0, size: 50 },
]

const ids = []

const velocity = 0.3

const ADD_BUBBLE = 'ADD_BUBBLE'

const bubbleReducer = (state, action) => {
  switch (action.type) {
    case ADD_BUBBLE:
      const id = state.ids.length
      const newBubble = {
        id,
        x: 1 + Math.random() * 500,
        y: 0,
        size: 50,
      }
      const bubbles = [...state.bubbles, newBubble]
      const ids = [...state.ids, id]
      return { ...state, bubbles, ids }
    default:
      return state
  }
}

const initialState = { ids, bubbles, velocity }

const BubbleProvider = ({ children }) => {
  const [bubblez, bubbles_dispatch] = useReducer(bubbleReducer, initialState)

  return (
    <BubbleContext.Provider value={{ bubblez, bubbles_dispatch }}>
      {children}
    </BubbleContext.Provider>
  )
}

export default BubbleProvider
