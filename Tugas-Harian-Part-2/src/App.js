import React from "react"
import "./Styles/App.css"
import Card from "./Components/Card"
import Checkbox from "./Components/Checkbox"

const App = () => {
    return (
        <div className="wrapper">
            <Card title="THINGS TO DO" subtitle="During Bootcamp in Jabarcodingcamp">
                <div className="box-cek">
                    <Checkbox id="1" name="1" label="Belajar Git & CLI" />
                    <Checkbox id="2" name="1" label="Belajar HTML & CSS" />
                    <Checkbox id="3" name="1" label="Belajar Javascript" />
                    <Checkbox id="4" name="1" label="Belajar ReactJS Dasar" />
                    <Checkbox id="5" name="1" label="Belajar ReactJS Advance" />
                </div>
                <button type="button" className="btn">
                    Send
                </button>
            </Card>
        </div>
    )
}

export default App
