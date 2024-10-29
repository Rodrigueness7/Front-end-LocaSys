

export default function InputSelect ({classNameInput,classNameLabel, label, name, datas}) {
    return(
        <div>
            <label className={classNameLabel} htmlFor={label}>{label}</label>
            <select className={classNameInput} name={name}>{datas.map((item, index) =><option key={index} value={item}>{item}</option>)}</select>
        </div>
    )
}