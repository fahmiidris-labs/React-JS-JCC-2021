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
        const result2 = result.data.map((row) => ({
            key: row.id,
            id: row.id,
            name: row.name,
            course: row.course,
            score: row.score,
        }))
        setScore(result2)
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