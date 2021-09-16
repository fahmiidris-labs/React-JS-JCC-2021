
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from './themeProvider'

const Nav = () => {

    const { dark, setDark } = useContext(ThemeContext)

    useEffect(() => {
        const element = document.getElementById("nav")
        if (dark === true) {
            element.classList.add('dark')
        } else {
            element.classList.remove('dark')
        }
    }, [dark])

    return (
        <>
            <nav id="nav">
                <ul>
                    <li>
                        <Link to="/">Tugas 9</Link>
                    </li>
                    <li>
                        <Link to="/tugas-10">Tugas 10</Link>
                    </li>
                    <li>
                        <Link to="/tugas-11">Tugas 11</Link>
                    </li>
                    <li>
                        <Link to="/tugas-12">Tugas 12</Link>
                    </li>
                    <li>
                        <Link to="/tugas-13">Tugas 13</Link>
                    </li>
                    <li>
                        <Link to="/tugas-14">Tugas 14</Link>
                    </li>
                </ul>
            </nav>

            <div className="box-theme-button">
                <button type="button" onClick={() => dark === false ? setDark(true) : setDark(false)}>
                    Change navbar to dark theme
                </button>
            </div>
        </>
    )
}

export default Nav
