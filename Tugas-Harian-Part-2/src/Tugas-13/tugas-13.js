import React from 'react'
import "../Styles/Tugas-13.css"
import Form from './form'
import Table from './table'
import { ScoreProvider } from './scoreProvider'

const Tugas13 = () => {
    return (
        <ScoreProvider>
            <div className="box-table">
                <div>
                    <Table />

                    <br />
                    <br />

                    <Form />
                </div>
            </div>
        </ScoreProvider>
    )
}

export default Tugas13
