
export default function InputForm({classNameLabe, classNameInput,label, div, name, type, value, min, onchange, required = false, onKeyDown}) {
   
    return (  
        <div className={div}>
            <label className={classNameLabe} htmlFor={label}>{label}</label>
            <input className={classNameInput} type={type} name={name} value={value} onChange={onchange} min={min} required={required} onKeyDown={onKeyDown}></input>
        </div>
    )
}