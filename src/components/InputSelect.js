

export default function InputSelect ({classNameInput,classNameLabel, label, name, datas, value, onchange, div, required = true}) {
    return(
        <div className={div}>
            <label className={classNameLabel} htmlFor={label}>{label}</label>
            <select className={classNameInput} name={name} value={value} onChange={onchange} required={required}>
            <option value=''></option>
                {datas.map((item, index) =>(<option key={index} value={item}>{item}</option>))}</select>
        </div>
    )
}

