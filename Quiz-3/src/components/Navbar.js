import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/img/logo.png"

import { Button, Input } from 'antd';
import { useState } from 'react';
import { useHistory } from "react-router-dom"

const Navbar = () => {

    const history = useHistory()

    const [credentials, setCredentials] = useState({
        search: ""
    })

    const onHandleChange = async (event) => {
        setCredentials(old => ({
            ...old,
            [event.target.name]: event.target.value
        }))
    }

    const onHandleSubmit = (event) => {
        event.preventDefault()
        history.push(`/search/${credentials.search}`)
    }

    return (
        <div className="topnav">
            <Link to="/">
                <img src={logo} width={70} alt="logo" />
            </Link>
            <Link to="/">Home</Link>
            <Link to="/mobile-list">Movie List</Link>
            <Link to="/about">About</Link>
            <form onSubmit={onHandleSubmit}>
                <Input type="text" name="search" value={credentials.search} onChange={onHandleChange} placeholder="Search ..." />
                <Button type="primary" htmlType="submit" style={{"marginLeft": "5px"}}>
                    Search
                </Button>
            </form>
        </div>
    )
}

export default Navbar
