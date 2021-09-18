import React from 'react'
import Main from '../components/Main'

const About = () => {
    return (
        <Main>
            <div style={{ padding: '10px', border: '1px solid gray' }}>
                <h1 style={{ textAlign: 'center' }}>Data Peserta Jabarcodingcamp-2021 ReactJS</h1>
                <ol>
                    <li>
                        <b>Nama:</b> Fahmi Idris
                    </li>
                    <li>
                        <b>Email:</b> fahmiidris.1607@gmail.com
                    </li>
                    <li>
                        <b>Sistem Operasi Yang Digunakan:</b> Linux OS [ KDE Neon ]
                    </li>
                    <li>
                        <b>Akun Github/Gitlab:</b> fahmiidris-labs
                    </li>
                    <li>
                        <b>Akun Akun Telegram:</b> Fahmi Idris - Kab. Bogor &lt;@FahmiIdrisA&gt;
                    </li>
                </ol>
            </div>
        </Main>
    )
}

export default About
