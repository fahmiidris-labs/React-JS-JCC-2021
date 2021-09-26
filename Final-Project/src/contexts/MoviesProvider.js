import { useState, createContext, useEffect } from "react"
import axios from "../libs/axios"

export const MoviesContext = createContext()

export const MoviesProvider = ({ children }) => {

    const [movies, setMovies] = useState([])

    const getMovies = async () => {
        try {
            const { data } = await axios.get("/data-movie")
            setMovies(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getMovies()
    }, [])
    
    return (
        <MoviesContext.Provider value={{
            movies,
            setMovies,

            getMovies
        }}>
            { children }
        </MoviesContext.Provider>
    )
}