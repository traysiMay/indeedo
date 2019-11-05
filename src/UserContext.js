import React, { useReducer } from 'react'

export const UserContext = React.createContext()

export const UPDATE_USER = "UPDATE_USER"

const initialUserState = { name: '' }

const user_reducer = (state, action) => {
    const { name } = action
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, name }
        default:
            return state
    }

}

const UserProvider = ({ children }) => {
    const [user, user_dispatch] = useReducer(user_reducer, initialUserState)

    return (
        <UserContext.Provider value={{ user, user_dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider