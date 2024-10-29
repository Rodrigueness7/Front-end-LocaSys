

export default function InputForm({classNameLabe, classNameInput,label, name, type, value, onchange}) {
    return (
        <div>
            <label className={classNameLabe} htmlFor={label}>{label}</label>
            <input className={classNameInput} type={type} name={name} value={value} onChange={onchange}></input>
        </div>
    )
}