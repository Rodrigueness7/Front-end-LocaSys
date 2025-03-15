
export default function changeProperty(obj, oldName, newName, key) {
    obj[newName] = obj[oldName][key]
    // delete obj[oldName]
}
