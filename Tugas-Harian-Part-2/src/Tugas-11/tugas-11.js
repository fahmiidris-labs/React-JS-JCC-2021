import React, { useState } from 'react'
import "../Styles/Tugas-11.css"

const Tugas11 = () => {

    const initialState = [
        { nama: "Nanas", hargaTotal: 100000, beratTotal: 4000 },
        { nama: "Manggis", hargaTotal: 350000, beratTotal: 10000 },
        { nama: "Nangka", hargaTotal: 90000, beratTotal: 2000 },
        { nama: "Durian", hargaTotal: 400000, beratTotal: 5000 },
        { nama: "Strawberry", hargaTotal: 120000, beratTotal: 6000 }
    ]

    const initialCrendentials = {
        nama: "",
        hargaTotal: "",
        beratTotal: 0
    }

    const [buah, setBuah] = useState(initialState)
    const [credentials, setCredentials] = useState(initialCrendentials)
    const [currentIndex, setCurrentIndex] = useState(-1)

    const onHandleChange = async (event) => {
        setCredentials(old => ({
            ...old,
            [event.target.name]: event.target.value
        }))
    }

    const onSubmitHandle = async (event) => {
        event.preventDefault()

        let newData = buah

        if (currentIndex === -1) {
            newData = [...buah, credentials]
        } else {
            newData[currentIndex] = credentials
        }

        setBuah(newData)
        setCredentials(initialCrendentials)
        setCurrentIndex(-1)
    }

    const onDeleteHandle = async (event) => {
        let index = parseInt(event.target.value)
        let deletedItem = buah[index]
        let newData = buah.filter((e) => { return e !== deletedItem })
        setBuah(newData)
    }

    const onEditHandle = async (event) => {
        let index = parseInt(event.target.value)
        let edit = buah[index]
        setCredentials(edit)
        setCurrentIndex(event.target.value)
    }

    return (
        <div className="box-table">
            <div>
                <h2 align="center">
                    Daftar Harga Buah
                </h2>
                <table className="products-table table-sendiri">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Harga Total</th>
                            <th>Berat Total</th>
                            <th>Harga Per Kg</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buah.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.nama}</td>
                                <td>Rp.{data.hargaTotal}</td>
                                <td>{data.beratTotal / 1000} Kg</td>
                                <td>Rp.{data.hargaTotal / (data.beratTotal / 1000)}</td>
                                <td>
                                    <button type="button" className="btn-edit" onClick={onEditHandle} value={index}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn-delete" onClick={onDeleteHandle} value={index}>
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
                    Form Daftar Harga Buah
                </h2>
                <form onSubmit={onSubmitHandle}>

                    <label htmlFor="nama">Nama</label>
                    <input id="nama" type="text" name="nama" value={credentials.nama} onChange={onHandleChange} required />

                    <label htmlFor="hargaTotal">Harga Total</label>
                    <input id="hargaTotal" type="text" name="hargaTotal" value={credentials.hargaTotal} onChange={onHandleChange} required />

                    <label htmlFor="beratTotal">Berat Total (dalam satuan gram)</label>
                    <input id="beratTotal" type="number" name="beratTotal" value={credentials.beratTotal} onChange={onHandleChange} required min={2000} />

                    <button type="submit" className="btn-submit">
                        Submit
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Tugas11
