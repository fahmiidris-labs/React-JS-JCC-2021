import React from "react"
import "../Styles/Tugas-9.css"
import logo from "../Assets/logo.png"

const Tugas9 = () => {
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

const Card = ({ title, subtitle, children }) => {
    return (
        <div className="box">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="header">
                <h2 className="title">{ title }</h2>
                <p>{ subtitle }</p>
            </div>
            
            { children }
        </div>
    )
}

const Checkbox = ({ id, name, label }) => {
    return (
        <div className="cek">
            <input type="checkbox"
                id={id}
                name={name}
                value={label}
            />

            <label className="label" htmlFor={label} label={label}>
                {label}
            </label>

        </div>
    )
}

export default Tugas9
