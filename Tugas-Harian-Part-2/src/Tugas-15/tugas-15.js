import React from 'react'
import "../Styles/Tugas-14.css"
import { ScoreProvider } from './scoreProvider'
import TableKu from './table'

const Tugas15 = () => {
    return (
        <div style={{"margin": "50px"}}>
            <ScoreProvider>
                <TableKu />
            </ScoreProvider>
        </div>
    )
}

export default Tugas15
