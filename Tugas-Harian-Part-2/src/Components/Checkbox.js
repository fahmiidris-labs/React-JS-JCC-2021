import "../Styles/Checkbox.css"

const Checkbox = ({ id, name, label }) => {
    return (
        <div className="cek">
            <input type="checkbox"
                id={id}
                name={name}
                value={label}
            />

            <label className="label" htmlFor={label} label={label}>
                {label}
            </label>

        </div>
    )
}

export default Checkbox
