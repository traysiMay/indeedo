import React, { useReducer } from 'react'

export const GameContext = React.createContext()

// mouse listener
// shape object
const mouseClick = { x: 0, y: 0 }

const initialGameState = { score: 0, phase: 0, over: false, begin: false }

const gameReducer = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const GameProvider = ({ children }) => {
    const [score, score_dispatch] = useReducer(gameReducer, initialGameState)
    return (
        <GameContext.Provider value={{ score }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider