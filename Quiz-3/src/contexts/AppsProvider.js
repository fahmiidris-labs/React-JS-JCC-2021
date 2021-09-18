import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const AppsContext = createContext();

export const AppsProvider = ({ children }) => {

    const initialCrendentials = {
        id: "",
        name: "",
        description: "",
        category: "",
        release_year: 2007,
        size: 0,
        price: 0,
        rating: 0,
        is_android_app: true,
        is_ios_app: false,
        image_url: "",
    }

    const [credentials, setCredentials] = useState(initialCrendentials)
    const [statusForm, setStatusForm] = useState("add")
    const [apps, setApps] = useState([])
    const [loading, setLoading] = useState(false)
    
    const fetchData = async () => {
        const result = await axios.get(`http://backendexample.sanbercloud.com/api/mobile-apps`)
        console.log(result)
        const result2 = result.data.map((row, index) => ({
            key: row.id,
            id: row.id,
            no: index + 1,
            name: row.name,
            category: row.category,
            description: row.description,
            image_url: row.image_url,
            is_android_app: row.is_android_app,
            is_ios_app: row.is_ios_app,
            price: row.price,
            rating: row.rating,
            release_year: row.release_year,
            size: row.size,
        }))
        setApps(result2)
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <AppsContext.Provider value={{
            apps,
            setApps,

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
        </AppsContext.Provider>
    );
};