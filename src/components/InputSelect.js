

export default function InputSelect ({classNameInput,classNameLabel, label, name, datas, value, onchange}) {
    return(
        <div>
            <label className={classNameLabel} htmlFor={label}>{label}</label>
            <select className={classNameInput} name={name} value={value} onChange={onchange}>
            <option value=''></option>
                {Array.isArray(datas) && datas.map((item, index) =>(<option key={index} value={item}>{item}</option>))}</select>
        </div>
    )
}

