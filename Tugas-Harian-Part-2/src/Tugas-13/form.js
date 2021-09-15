
import axios from 'axios'
import React, { useContext } from 'react'
import { ScoreContext } from './scoreProvider'

const Form = () => {

    const { initialCrendentials, statusForm, setStatusForm, credentials, setCredentials, loading, setLoading, fetchData } = useContext(ScoreContext)

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

    return (
        <>
            <h2 align="center">
                Form Nilai Mahasiswa
            </h2>
            <form onSubmit={statusForm === "add" ? onSubmitHandle : onSubmitUpdateHandle}>

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
        </>
    )
}

export default Form
