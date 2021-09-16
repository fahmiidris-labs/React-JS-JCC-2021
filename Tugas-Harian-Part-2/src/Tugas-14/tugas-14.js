import React from 'react'
import "../Styles/Tugas-14.css"
import Table from './table'
import { ThemeProvider } from './themeProvider'

const Tugas14 = () => {
    return (
        <div className="box-table">
            <div>
                <ThemeProvider>
                    <Table />
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Tugas14
