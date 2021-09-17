
import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Table, Space, Row, Col, Button, message } from 'antd';
import { ScoreContext } from './scoreProvider';
import {
    DeleteFilled,
    EditFilled
} from '@ant-design/icons';

const TableKu = () => {

    const { score, setStatusForm, setCredentials, fetchData } = useContext(ScoreContext)
    let history = useHistory()

    const onDeleteHandle = async (id) => {
        try {
            await axios.delete(`http://backendexample.sanbercloud.com/api/student-scores/${id}`)
            fetchData()
            message.success("Data Berhasil Di Hapus!")
        } catch (err) {
            console.log(err.message)
        }
    }

    const onEditHandle = async (id) => {
        try {
            setStatusForm("edit")
            const result = await axios.get(`http://backendexample.sanbercloud.com/api/student-scores/${id}`)
            await setCredentials(old => ({
                ...old,
                id: result.data.id,
                name: result.data.name,
                course: result.data.course,
                score: result.data.score,
            }))
            history.push(`/tugas-15/edit/${id}`)
        } catch (err) {
            console.log("edit")
            setStatusForm("add")
        }
    }

    const columns = [
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mata Kuliah',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Nilai',
            key: 'score',
            dataIndex: 'score',
        },
        {
            title: 'Indeks Nilai',
            key: 'index-score',
            dataIndex: 'index-score',
            render: (text, record) => (
                <div>
                    {record.score >= 80 && "A"}
                    {record.score >= 70 && record.score < 80 && "B"}
                    {record.score >= 60 && record.score < 70 && "C"}
                    {record.score >= 50 && record.score < 60 && "D"}
                    {record.score < 50 && "E"}
                </div>
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
        <div>
            <Row>
                <Col span="24">
                    <h1>Daftar Nilai Mahasiswa</h1>
                </Col>
            </Row>
            <Row style={{ "marginBottom": "30px" }}>
                <Col span="24">
                    <Link to="/tugas-15/create">
                        <Button type="primary">Buat data nilai mahasiswa baru</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <Table columns={columns} dataSource={score} />
                </Col>
            </Row>
        </div>
    )
}

export default TableKu
