'use client'
import { useState } from "react"
import InputForm from "../../../../../components/InputForm"
import updateData from "../../../../../utils/updateData"
import deleteData from "../../../../../utils/deleteData"


export default function UpdateProfile({ data, idProfile, dataPermission, token }) {

    const [profile, setProfile] = useState(data.profile)
    const [result, setResult] = useState('')
    const [selectPermission, setSelectPermission] = useState(
        dataPermission.map(values => ({
            id: values.idProfile_permission,
            permission: values['Permission'].permission,
            section: values['Permission'].section,
            checked: values.allow

        }))
    )

    const changeProfile = (e) => {
        setProfile(e.target.value)
    }

    const handleChange = (e) => {
        const { id, checked } = e.target
        setSelectPermission((p) => p.map((p) => p.id == id ? { ...p, checked } : p
        ))
    }

    const updateProfile = async () => {
        const dataProfile = {
            profile: profile
        }
        const dataProfile_permission = selectPermission.map(itens => ({
            idProfile_permission: itens.id,
            idProfile: idProfile,
            idPermission: itens.permission,
            allow: itens.checked
        }))

        await updateData(`http://localhost:3001/updateProfile/${idProfile}`, dataProfile, token, setResult)
        await updateData(`http://localhost:3001/updateProfile_permission`, dataProfile_permission, token, setResult)


    }

    const deleteProfile = async () => {
        await deleteData(`http://localhost:3001/deleteProfile_permission/${idProfile}`, token, setResult)
        await deleteData(`http://localhost:3001/deleteProfile/${idProfile}`, token, setResult)
    }

    return (
        <section className="bg-gray-100 py-3 h-screen">
            <div className="flex items-start mb-8 lg:px-2 sm:px-0">
                <button onClick={deleteProfile} className="p-2 bg-indigo-500 rounded-lg text-white">Deletar</button>
            </div>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Perfil </h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Perfil"} name={"Profile"} type={'text'} value={profile} onchange={changeProfile}></InputForm>
                    <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                        {selectPermission.map((itens) => (
                            <label className="flex items-center" key={itens.id}>
                                <input id={itens.id} type="checkbox" value={itens.section + ' - ' + itens.permission} checked={itens.checked} onChange={handleChange}></input>
                                <span className="ml-2"> {itens.section + ' - ' + itens.permission}</span>
                            </label>
                        ))}
                    </div>
                </form>
                <div className="mb-6">
                    <button onClick={updateProfile} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}