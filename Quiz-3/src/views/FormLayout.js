
import axios from 'axios'
import React, { useContext } from 'react'
import { AppsContext } from '../contexts/AppsProvider'
import { useHistory } from "react-router-dom"
import { message, Card, Input, Checkbox, Button } from 'antd'

const FormLayout = () => {

    const { initialCrendentials, statusForm, setStatusForm, credentials, setCredentials, loading, setLoading, fetchData } = useContext(AppsContext)
    let history = useHistory()

    const onHandleChange = async (event) => {
        setCredentials(old => ({
            ...old,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked ? true : false : event.target.value
        }))
    }

    const onSubmitHandle = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            await axios.post("http://backendexample.sanbercloud.com/api/mobile-apps", credentials)
            await fetchData()
            message.success("Data berhasil di tambahkan!")
            history.push("/mobile-list")
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
            await axios.put(`http://backendexample.sanbercloud.com/api/mobile-apps/${credentials.id}`, credentials)
            await fetchData()
            message.success("Data berhasil di update!")
            history.push("/mobile-list")
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
        <div className="site-card-border-less-wrapper">
            <Card title="Form Apps Mobile List" bordered={false} style={{ width: 600 }}>
                <form onSubmit={statusForm === "add" ? onSubmitHandle : onSubmitUpdateHandle}>
                    <div className="form-group">
                        <label htmlFor="name">Nama</label>
                        <Input id="name" type="text" name="name" value={credentials.name} onChange={onHandleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Input.TextArea id="description" name="description" value={credentials.description} onChange={onHandleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <Input id="category" type="text" name="category" value={credentials.category} onChange={onHandleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="release_year">Release Year</label>
                        <Input id="release_year" type="number" name="release_year" value={credentials.release_year} onChange={onHandleChange} min={2007} max={2021} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="size">Size (Satuan MB)</label>
                        <Input id="size" type="number" name="size" value={credentials.size} onChange={onHandleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <Input id="price" type="number" name="price" value={credentials.price} onChange={onHandleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <Input id="rating" type="number" name="rating" value={credentials.rating} onChange={onHandleChange} min={0} max={5} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image_url">Image URL</label>
                        <Input id="image_url" type="text" name="image_url" value={credentials.image_url} onChange={onHandleChange} required />
                    </div>

                    <div className="form-group">
                        <Checkbox disabled={credentials.is_android_app && true} name="is_ios_app" checked={credentials.is_ios_app} onChange={onHandleChange}>iOS</Checkbox>
                        <Checkbox disabled={credentials.is_ios_app && true} name="is_android_app" checked={credentials.is_android_app} onChange={onHandleChange}>Android</Checkbox>
                        <p style={{"fontSize": "10px"}}>Uncheck dulu untuk merubah pilihan</p>
                    </div>

                    <br />

                    <Button type="primary" htmlType="submit">
                        {!loading ? statusForm === "add" ? "Submit" : "Update" : "Loading ..."}
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default FormLayout
