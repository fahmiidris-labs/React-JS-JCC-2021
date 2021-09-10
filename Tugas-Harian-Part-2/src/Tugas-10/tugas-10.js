import React, { useEffect, useState } from 'react'
import "../Styles/Tugas-10.css"

const Tugas10 = () => {

    const [ready, setReady] = useState(true)
    const [state, setState] = useState({
        date: new Date(),
        countdown: 100
    })

    useEffect(() => {
        if(state.countdown > 0) {
            const timer = setInterval(() => {
                setState(prevState => ({
                    ...prevState,
                    date: new Date(),
                    countdown: prevState.countdown - 1
                }))
            }, 1000)
    
            return () => {
                clearInterval(timer)
            }
        } else {
            setReady(false)
        }
    }, [state.countdown])

    // console.log(state, ready)

    return ready ? (
        <div className="jam">
            <div className="box-jam">
                <Clock data={state} />
            </div>
        </div>
    ) : null
}

const Clock = ({ data }) => {
    return (
        <div>
            <h1>Now At - {data.date.toLocaleTimeString()}</h1>
            <h3>Countdown : {data.countdown}</h3>
        </div>
    )
}

export default Tugas10
