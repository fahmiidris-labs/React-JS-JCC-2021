
import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Table, Space, Row, Col, Button, message } from 'antd';
import { AppsContext } from '../contexts/AppsProvider';

import {
    DeleteFilled,
    EditFilled
} from '@ant-design/icons';

const ListApps = () => {

    const { apps, fetchData, setStatusForm, setCredentials } = useContext(AppsContext)
    let history = useHistory()

    const onDeleteHandle = async (id) => {
        try {
            await axios.delete(`http://backendexample.sanbercloud.com/api/mobile-apps/${id}`)
            fetchData()
            message.success("Data Berhasil Di Hapus!")
        } catch (err) {
            console.log(err.message)
        }
    }

    const onEditHandle = async (id) => {
        try {
            setStatusForm("edit")
            const result = await axios.get(`http://backendexample.sanbercloud.com/api/mobile-apps/${id}`)
            await setCredentials(old => ({
                ...old,
                id: result.data.id,
                name: result.data.name,
                description: result.data.description,
                category: result.data.category,
                release_year: result.data.release_year,
                size: result.data.size,
                price: result.data.price,
                rating: result.data.rating,
                is_android_app: result.data.is_android_app,
                is_ios_app: result.data.is_ios_app,
                image_url: result.data.image_url,
            }))
            history.push(`/mobile-form/edit/${id}`)
        } catch (err) {
            console.log("edit")
            setStatusForm("add")
        }
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            key: 'category',
            dataIndex: 'category',
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: 'Release Year',
            key: 'release_year',
            dataIndex: 'release_year',
        },
        {
            title: 'Size',
            key: 'size',
            dataIndex: 'size',
        },
        {
            title: 'Rating',
            key: 'rating',
            dataIndex: 'rating',
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
        },
        {
            title: 'Platform',
            key: 'platform',
            dataIndex: 'platform',
            render: (text, record) => (
                record.is_android_app === 1 && record.is_ios_app === 1 ? "Android And ISO" : record.is_android_app === 1 && record.is_ios_app === 0 ? "Android" : record.is_android_app === 0 && record.is_ios_app === 1 ? "iOS" : ""
            )
        },
        {
            title: 'Aksi',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => onEditHandle(record.id)}><EditFilled /></Button>
                    <Button type="primary" danger onClick={() => onDeleteHandle(record.id)}><DeleteFilled /></Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="box-movie-list">
            <Row>
                <Col span="24">
                    <h1 align="center">Mobile Apps List</h1>
                </Col>
            </Row>
            <Row style={{ "marginBottom": "30px" }}>
                <Col span="24">
                    <Link to="/mobile-form">
                        <Button type="primary">Add new mobile apps list</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <Table columns={columns} dataSource={apps} />
                </Col>
            </Row>
        </div>
    )
}

export default ListApps
