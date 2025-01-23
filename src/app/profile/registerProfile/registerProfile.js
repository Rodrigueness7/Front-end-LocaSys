'use client'
import { useState } from "react";
import InputForm from "../../../../components/InputForm";
import addData from "../../../../utils/addData";
import InputCheckbox from "../../../../components/inputCheckBox";


export default function RegisterProfile({ token, dataPermission }) {

    const [profile, setProfile] = useState('')
    const [isCheckBox, setIsCheckBox] = useState({
        Gravar: false,
        Ler: false,
        Atualizar: false,
        Deletar: false
    })
    const [result, setResult] = useState('')

    const changeProfile = (e) => {
        setProfile(e.target.value)
    }

    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        setIsCheckBox((prevState) => ({
            ...prevState,
            [name]: checked
        }))

    }

    const addProfile = async () => {
        const selectedPermission = Object.keys(isCheckBox).filter(
            (keys) => isCheckBox[keys] == true
        )

        const dataProfile = { profile: profile }
        const dataProfile_permission = {
            idprofile_permission: 0,
            idProfile: 0,
            idPermission: selectedPermission,
            profile: profile
        }

        await addData('http://localhost:3001/addProfile', dataProfile, token, setResult)
     
        

        setInterval(async() =>{
            await addData('http://localhost:3001/addProfile_permission', dataProfile_permission, token, setResult)
        }, 2000)
    }

    return (
        <section className="bg-gray-100 py-3 h-screen">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Adicionar Perfil </h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Perfil"} name={"Profile"} type={'text'} value={profile} onchange={changeProfile}></InputForm>
                    <div className="flex">
                        <InputCheckbox nameLabel={'Gravar'} inputName={'Gravar'} checked={isCheckBox.Gravar} handleCheckbox={handleCheckbox} ></InputCheckbox>
                        <InputCheckbox nameLabel={'Ler'} inputName={'Ler'} checked={isCheckBox.Ler} handleCheckbox={handleCheckbox} ></InputCheckbox>
                        <InputCheckbox nameLabel={'Atualizar'} inputName={'Atualizar'} checked={isCheckBox.Atualizar} handleCheckbox={handleCheckbox} ></InputCheckbox>
                        <InputCheckbox nameLabel={'Deletar'} inputName={'Deletar'} checked={isCheckBox.Deletar} handleCheckbox={handleCheckbox} ></InputCheckbox>
                    </div>
                </form>
                <div className="mb-6">
                    <button onClick={addProfile} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Adicionar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}