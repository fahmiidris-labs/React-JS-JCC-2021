import React from 'react'
import ReactDOM from 'react-dom'
import './Styles/index.css'
import 'antd/dist/antd.css';
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ScoreProvider } from './Tugas-14/scoreProvider'
import { ScoreProvider as ScoreProviderNew } from "./Tugas-15/scoreProvider";

ReactDOM.render(
    <React.StrictMode>
        <ScoreProvider>
            <ScoreProviderNew>
                <App />
            </ScoreProviderNew>
        </ScoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
