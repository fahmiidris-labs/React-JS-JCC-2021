import React from 'react'

const Main = ({ children }) => {
    return (
        <div className="row">
            <div className="section">
                <div className="card">
                    { children }
                </div>
            </div>
        </div>
    )
}

export default Main
