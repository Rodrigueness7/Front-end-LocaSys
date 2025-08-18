'use client'
import { useState } from "react";
import InputForm from "../../../components/InputForm";
import addData from "../../../utils/addData";
import fetchData from "../../../utils/fetchData";
import MessageModal from "@/components/messageModal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";


export default function RegisterProfile({ token, dataPermission }) {

    const [profile, setProfile] = useState('')
    const [selectedPermissions, setSelectPermissions] = useState(
        dataPermission.map(permission => ({
            id: permission.idPermission,
            value: permission.permission + ' - ' + permission.section,
            checked: false
        }))
    )
    const [result, setResult] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const changeProfile = (e) => {
        setProfile(e.target.value)
    }

    const handleChange = (e) => {
        const { value, checked } = e.target
        setSelectPermissions(prev => prev.map(
            p => p.value === value ? { ...p, checked } : p
        ))
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            router.push('./')
        }
    }


    const addProfile = async (e) => {
        e.preventDefault()
        let dataProfile = {
            idProfile: 0,
            profile: profile
        }

        addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addProfile`, dataProfile, token, setResult)
        setIsModalOpen(true)

        setTimeout(async () => {
            let fetchProfile = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllProfile`, token)
            let idProfile = fetchProfile.find(item => item.profile === profile).idProfile

            let dataProfile_permission = selectedPermissions.map(itens => ({
                profile: profile,
                idProfile_permission: 0,
                idProfile: idProfile,
                idPermission: itens.id,
                allow: itens.checked
            }))
            addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addProfile_permission`, dataProfile_permission, token, setResult)
            setIsModalOpen(true)
        }, 3000)

    }

    return (
        <section className="bg-gray-100 py-3 h-screen w-full">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Adicionar Perfil </h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"Perfil"} name={"Profile"} type={'text'} value={profile} onchange={changeProfile}></InputForm>
                    <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                        {selectedPermissions.map(({ id, value, checked }) => (
                            <label className="flex items-center" key={id}>
                                <input type="checkbox" value={value} checked={checked} onChange={handleChange} />
                                <span className="ml-2 text-black"> {value}</span>
                            </label>
                        ))}
                    </div>
                </form>
                <div className="mb-6">
                    <button onClick={addProfile} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Adicionar</button>
                </div>
                <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                    result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                        <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                    )
                }></MessageModal>
            </div>
        </section>
    )
}