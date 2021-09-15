
import axios from 'axios'
import React, { useContext } from 'react'
import { ScoreContext } from './scoreProvider'

const Table = () => {

    const { score, setStatusForm, setCredentials, fetchData } = useContext(ScoreContext)

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

    return (
        <>
            <h1 align="center">Daftar Nilai Mahasiswa</h1>
            <table className="table">
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
        </>
    )
}

export default Table
