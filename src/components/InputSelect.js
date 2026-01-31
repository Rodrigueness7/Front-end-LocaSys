

export default function InputSelect ({classNameInput,classNameLabel, label, name, datas, value, onchange, div, required = true, disabled = false}) {
    return(
        <div className={div}>
            <label className={classNameLabel} htmlFor={label}>{label}</label>
            <select className={classNameInput} name={name} value={value} onChange={onchange} required={required} disabled={disabled}>
            <option value=''></option>
                {datas.map((item, index) =>(<option key={index} value={item}>{item}</option>))}</select>
        </div>
    )
}

