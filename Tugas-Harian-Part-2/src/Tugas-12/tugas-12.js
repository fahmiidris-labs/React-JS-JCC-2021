import React, { useEffect, useState } from 'react'
import "../Styles/Tugas-12.css"
import axios from "axios"

const Tugas12 = () => {

    
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

    const onHandleChange = async (event) => {
        setCredentials(old => ({
            ...old,
            [event.target.name]: event.target.value
        }))
    }

    const onSubmitHandle = async (event) => {
        event.preventDefault()
        setLoading(true)
        console.log(statusForm)
        try {
            await axios.post("http://backendexample.sanbercloud.com/api/student-scores", credentials)
            fetchData()
            setCredentials(initialCrendentials)
            setLoading(false)
            setStatusForm("add")
        } catch (err) {
            console.log(err.message)
            setLoading(false)
            setStatusForm("add")
        }        
    }

    const onSubmitUpdateHandle = async (event) => {
        event.preventDefault()
        console.log(statusForm)
        setLoading(true)
        try {
            await axios.put(`http://backendexample.sanbercloud.com/api/student-scores/${credentials.id}`, credentials)
            fetchData()
            setCredentials(initialCrendentials)
            setLoading(false)
            setStatusForm("add")
        } catch (err) {
            console.log(err.message)
            setLoading(false)
            setStatusForm("add")
        }        
    }

    const onDeleteHandle = async (id) => {
        try {
            await axios.delete(`http://backendexample.sanbercloud.com/api/student-scores/${id}`)
            fetchData()
        } catch (err) {
            console.log(err.message)
        }
    }

    const onEditHandle = async (id) => {
        try {
            setStatusForm("edit")
            const result = await axios.get(`http://backendexample.sanbercloud.com/api/student-scores/${id}`)
            setCredentials(old => ({
                ...old,
                id: result.data.id,
                name: result.data.name,
                course: result.data.course,
                score: result.data.score,
            }))
        } catch (err) {
            console.log("edit")
            setStatusForm("add")
        }
    }

    const fetchData = async () => {
        const result = await axios.get(`http://backendexample.sanbercloud.com/api/student-scores`)
        setScore(result.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="box-table">
            <div>
                <h1 align="center">Daftar Nilai Mahasiswa</h1>
                <table className="table table-sendiri">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Mata Kuliah</th>
                            <th>Nilai</th>
                            <th>Indeks Nilai</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {score.length < 1 && (
                            <tr>
                                <td colSpan="6">Tidak ada nilai mahasiswa</td>
                            </tr>
                        )}
                        {score.length > 0 && score.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.course}</td>
                                <td>{data.score}</td>
                                <td>
                                    {data.score >= 80 && "A"}
                                    {data.score >= 70 && data.score < 80 && "B"}
                                    {data.score >= 60 && data.score < 70 && "C"}
                                    {data.score >= 50 && data.score < 60 && "D"}
                                    {data.score < 50 && "E"}
                                </td>
                                <td>
                                    <button type="button" className="btn-edit" onClick={() => onEditHandle(data.id)}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn-delete" onClick={() => onDeleteHandle(data.id)}>
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <br />
                <br />

                <h2 align="center">
                    Form Nilai Mahasiswa
                </h2>
                <form onSubmit={statusForm === "add" ?  onSubmitHandle : onSubmitUpdateHandle}>

                    <label htmlFor="name">Nama</label>
                    <input id="name" type="text" name="name" value={credentials.name} onChange={onHandleChange} required />

                    <label htmlFor="course">Mata Kuliah</label>
                    <input id="course" type="text" name="course" value={credentials.course} onChange={onHandleChange} required />

                    <label htmlFor="score">Nilai</label>
                    <input id="score" type="number" name="score" value={credentials.score} onChange={onHandleChange} required min={0} max={100} />

                    <button type="submit" className="btn-submit">
                        {!loading ? statusForm === "add" ? "Submit" : "Update" : "Loading ..."}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Tugas12
