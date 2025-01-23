
export default function InputCheckbox({classInput ,nameLabel, checked, handleCheckbox, inputName }) {

    return (
        <div>
            <label>
                <input className={classInput} type="checkbox" name={inputName} checked={checked} onChange={handleCheckbox}/>{nameLabel}
            </label>
        </div>
    )
}