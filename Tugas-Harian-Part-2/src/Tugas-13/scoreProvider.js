import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {

    const initialCrendentials = {
        id: "",
        name: "",
        course: "",
        score: 0
    }

    const [score, setScore] = useState([])
    const [credentials, setCredentials] = useState(initialCrendentials)
    const [loading, setLoading] = useState(false)
    const [statusForm, setStatusForm] = useState("add")

    const fetchData = async () => {
        const result = await axios.get(`http://backendexample.sanbercloud.com/api/student-scores`)
        setScore(result.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ScoreContext.Provider value={{
            score,
            setScore,

            credentials,
            setCredentials,

            loading,
            setLoading,

            statusForm,
            setStatusForm,

            initialCrendentials,

            fetchData
        }}>
            { children }
        </ScoreContext.Provider>
    );
};