'use client'
import { useState } from "react";
import InputForm from "../../../../components/InputForm";


export default function RegisterProfile() {

    const [profile, setProfile] = useState('')
    const [result, setResult] = useState('')

    const changeProfile = (e) => {
        setProfile(e.target.value)
    }

    const addProfile = async () => {
        const data = { profile: profile }

        await fetch('http://localhost:3001/addProfile', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        }).then(
            result => result.json()
        ).then(
            res => setResult(res.message)
        )
    }

    return (
        <section className="bg-gray-100 py-3 h-screen">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Adicionar Perfil </h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Perfil"} name={"Profile"} type={'text'} value={profile} onchange={changeProfile}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={addProfile} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Adicionar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}