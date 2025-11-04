'use client'
import { useState } from "react"
import InputForm from "../../../../components/InputForm"
import updateData from "../../../../utils/updateData"
import deleteData from "../../../../utils/deleteData"
import MessageModal from "@/components/messageModal"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { useRouter } from "next/navigation"


export default function UpdateProfile({ data, idProfile, dataPermission, token }) {

    let ordemPermission = dataPermission.map(value => {
        if(value['Permission'].section === 'equipment') {
            value['Permission'].section = 'Equipamento'
        }
        if(value['Permission'].section === 'branch') {
            value['Permission'].section = 'Filial'
        }
        if(value['Permission'].section === 'sector') {
            value['Permission'].section = 'Setor'
        }
        if(value['Permission'].section === 'user') {
            value['Permission'].section = 'Usuário'
        }
        if(value['Permission'].section === 'profile') {
            value['Permission'].section = 'Perfil'
        }
        if(value['Permission'].section === 'equipmentHistory') {
            value['Permission'].section = 'Histórico do Equipamento'
        }
        if(value['Permission'].section === 'typeEquipment') {
            value['Permission'].section = 'Tipo de Equipamento'
        }
        if(value['Permission'].section === 'equipmentRental') {
            value['Permission'].section = 'Equipamento Alugado'
        }
        if(value['Permission'].section === 'permission') {
            value['Permission'].section = 'Permissão'
        }
        if(value['Permission'].section === 'profile_permission') {
            value['Permission'].section = 'Perfil_Permissão'
        }
        if(value['Permission'].section === 'contact') {     
            value['Permission'].section = 'Contato'
        }
        if(value['Permission'].section === 'supplier') {
            value['Permission'].section = 'Fornecedor'
        }
        if(value['Permission'].section === 'log') {
            value['Permission'].section = 'Log'
        }
        return value   
    }).sort((a, b) => {
        if (a['Permission'].section < b['Permission'].section) {
            return -1;
        }   
        if (a['Permission'].section > b['Permission'].section) {
            return 1;
        }       
        return 0;
    });

    
    const router = useRouter()
    const [profile, setProfile] = useState(data.profile)
    const [result, setResult] = useState('')
    const [selectPermission, setSelectPermission] = useState(
        ordemPermission.map(values => ({
            id: values.idProfile_permission,
            permission: values['Permission'].permission,
            section: values['Permission'].section,
            checked: values.allow

        }))
    )
    const [isModalOpen, setIsModalOpen] = useState(false)

    const changeProfile = (e) => {
        setProfile(e.target.value)
    }

    const handleChange = (e) => {
        const { id, checked } = e.target
        setSelectPermission((p) => p.map((p) => p.id == id ? { ...p, checked } : p
        ))
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            router.push('../')
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        const dataProfile = {
            profile: profile
        }
        const dataProfile_permission = selectPermission.map(itens => ({
            idProfile_permission: itens.id,
            idProfile: idProfile,
            idPermission: itens.permission,
            allow: itens.checked
        }))

        await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateProfile/${idProfile}`, dataProfile, token, setResult)
        setIsModalOpen(true)
        setTimeout(async () => {
            await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateProfile_permission`, dataProfile_permission, token, setResult)
            setIsModalOpen(true)
        }, 2000)

    }

    const deleteProfile = async () => {
        await deleteData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/deleteProfile_permission/${idProfile}`, token, setResult)
        await deleteData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/deleteProfile/${idProfile}`, token, setResult)
        setIsModalOpen(true)
    }

    return (
        <section className="bg-gray-100 py-3 h-screen w-full">
            <div className="flex items-start mb-8 lg:px-2 sm:px-0">
              { idProfile != 1 && idProfile !=2 && (
                  <button onClick={deleteProfile} className="p-2 bg-indigo-500 rounded-lg text-white">Deletar</button>
              )}
            </div>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Perfil </h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4" onSubmit={updateProfile}>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"Perfil"} name={"Profile"} type={'text'} value={profile} onchange={changeProfile} required={true}></InputForm>
                    <div className="grid gap-4 max-h-60 overflow-y-auto">
                        {selectPermission.map((itens) => (
                            <label className="flex items-center" key={itens.id}>
                                <input id={itens.id} type="checkbox" value={itens.section + ' - ' + itens.permission} checked={itens.checked} onChange={handleChange}></input>
                                <span className="ml-2 text-black"> {itens.section + ' - ' + itens.permission}</span>
                            </label>
                        ))}
                    </div>
                <div className="mb-6">
                    <button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
                </div>
                </form>
                <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                    result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                        <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                    )
                }></MessageModal>
            </div>
        </section>
    )
}