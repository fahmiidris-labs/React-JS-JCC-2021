import "../Styles/Card.css"
import logo from "../Assets/logo.png"

const Card = ({ title, subtitle, children }) => {
    return (
        <div className="box">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="header">
                <h2 className="title">{ title }</h2>
                <p>{ subtitle }</p>
            </div>
            
            { children }
        </div>
    )
}

export default Card
