import { useState, createContext, useEffect } from "react"
import axios from "../libs/axios"

export const GamesContext = createContext()

export const GamesProvider = ({ children }) => {

    const [games, setGames] = useState([])

    const getGames = async () => {
        try {
            const { data } = await axios.get("/data-game")
            setGames(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getGames()
    }, [])
    
    return (
        <GamesContext.Provider value={{
            games,
            setGames,

            getGames
        }}>
            { children }
        </GamesContext.Provider>
    )
}