import React, { useContext } from 'react'
import { List, Space } from 'antd';
import Main from '../components/Main'
import { AppsContext } from '../contexts/AppsProvider'

const Home = () => {

    const { apps } = useContext(AppsContext)

    return (
        <Main>
            <h1 align="center">Popular Mobile Apps</h1>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={apps}
                footer={
                    <div>
                        <b>Apps Popular</b> in Andriod and IOS
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.key}
                        actions={[
                            <IconText text="Price" number={toMoney(item.price)} key="list-vertical-star-o" />,
                            <IconText text="Size" number={bytesToSize(item.size)} key="list-vertical-like-o" />,
                            <IconText text="Rating" number={item.rating} key="list-vertical-message" />,
                            <IconText text="Platform" number={item.is_android_app === 1 && item.is_ios_app === 1 ? "Android And ISO" : item.is_android_app === 1 && item.is_ios_app === 0 ? "Android" : item.is_android_app === 0 && item.is_ios_app === 1 ? "iOS" : ""} key="list-vertical-platform" />,
                        ]}
                        extra={
                            <img
                                width={250}
                                alt="logo"
                                src={item.image_url}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={
                                <>
                                    <span style={{ "fontSize": "20px" }}>{item.platform}</span>
                                    <span style={{ "fontSize": "20px" }}>{item.name}</span>
                                    <p style={{ "fontSize": "10px" }}>Release year {item.release_year}</p>
                                </>
                            }
                            description={item.description}
                        />

                    </List.Item>
                )}
            />
        </Main>
    )
}

const IconText = ({ text, number }) => (
    <Space>
        {text}
        {number}
    </Space>
);

const toMoney = (num) => {
    if (num === 0) {
        return "Free"
    }
    const thouSep = ".";
    const decSep = ",";
    const rupiah = (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; })
    return "Rp. " + rupiah
}

const bytesToSize = (bytes) => {
    var sizes = ['MB', 'GB', 'TB'];
    if (bytes === 0) return '0 MB';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export default Home
