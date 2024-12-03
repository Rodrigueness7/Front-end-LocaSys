
export default function ChangeProperty(obj, oldName, newName, key) {
    obj[newName] = obj[oldName][key]
    delete obj[oldName][key]
}