'use client'
import { useState } from "react"
import InputForm from "../../../../../components/InputForm"
import updateData from "../../../../../utils/updateData"
import deleteData from "../../../../../utils/deleteData"


export default function UpdateProfile({ data, idProfile, token }) {

    const [profile, setProfile] = useState(data.profile)
    const [result, setResult] = useState('')

    const changeProfile = (e) => {
        setProfile(e.target.value)
    }

    const updateProfile = async () => {
        const data = {
            profile: profile
        }

        await updateData(`http://localhost:3001/updateProfile/${idProfile}`, data, token, setResult)

    }

    const deleteProfile = async () => {
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
                </form>
                <div className="mb-6">
                    <button onClick={updateProfile} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}