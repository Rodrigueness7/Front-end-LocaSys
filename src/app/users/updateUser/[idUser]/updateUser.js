'use client'

import { useEffect, useState } from "react"
import InputForm from "../../../../components/InputForm"
import InputSelect from "../../../../components/InputSelect"
import updateData from "../../../../utils/updateData"
import inactivateData from "../../../../utils/inactivateData"
import { useRouter } from "next/navigation"
import MessageModal from "@/components/messageModal"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"


export default function UpdateUser({ dataUserId, dataSector, dataProfile, idUser, token }) {


    const listSector = dataSector.map(item => item.sector)
    const listProfile = dataProfile.map(item => item.profile)


    const [firstName, setFirstName] = useState(dataUserId.firstName)
    const [lastName, setLastName] = useState(dataUserId.lastName)
    const [cpf, setCpf] = useState((dataUserId.cpf == null) ? "" : dataUserId.cpf)
    const [username, setUsername] = useState(dataUserId.username)
    const [password, setPassword] = useState((dataUserId.password == null) ? "" : dataUserId.password)
    const [confirmationPassword, setConfirmationPassword] = useState((dataUserId.password == null) ? "" : dataUserId.password)
    const [email, setEmail] = useState((dataUserId.email == null) ? "" : dataUserId.email)
    const [confirmationEmail, setConfirmationEmail] = useState((dataUserId.email == null) ? "" : dataUserId.email)
    const [sector, setSector] = useState(dataUserId['Sector'].sector)
    const [profile, setProfile] = useState(dataUserId['Profile'].profile)
    const [result, setResult] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const [permission, setPermission] = useState([])


    useEffect(() => {
        let data = localStorage.getItem('permission')
        let number = data.split(',').map(number => number)
        setPermission(number)

    }, [])



    const changeFirstName = (e) => {
        let newFirstName = e.target.value
        if (newFirstName === '' || newFirstName.length <= 20) {
            setFirstName(newFirstName)
        }
    }

    const changeLastName = (e) => {
        let newLastName = e.target.value
        if (newLastName === '' || newLastName.length <= 20) {
            setLastName(newLastName)
        }
    }

    const changeCpf = (e) => {
        let newCpf = e.target.value
        if (newCpf === '' || newCpf.length <= 11) {
            setCpf(newCpf)
        }
    }

    const changeUsername = (e) => {
        let newUsername = e.target.value
        if (newUsername === '' || newUsername.length <= 20) {
            setUsername(newUsername)
        }

    }

    const changePassword = (e) => {
        let newPassword = e.target.value
        if (newPassword === '' || newPassword.length <= 22) {
            setPassword(e.target.value)
        }


    }

    const changeConfirmationPassword = (e) => {
        let newConfirmationPassword = e.target.value
        if (newConfirmationPassword === '' || newConfirmationPassword.length <= 22) {
            setConfirmationPassword(newConfirmationPassword)
        }
    }

    const changeEmail = (e) => {
        let newEmail = e.target.value
        if (newEmail === '' || newEmail.length <= 50) {
            setEmail(e.target.value)
        }

    }

    const changeConfirmationEmail = (e) => {
        let newConfirmationEmail = e.target.value
        if (newConfirmationEmail === '' || newConfirmationEmail.length <= 50) {
            setConfirmationEmail(e.target.value)
        }
    }

    const changeSector = (e) => {
        setSector(e.target.value)

    }

    const changeProfile = (e) => {
        setProfile(e.target.value)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            router.push('../')
        }
    }

    const updateUser = async () => {
        const idProfile = dataProfile.find(item => item.profile === profile).idProfile
        const idSector = dataSector.find(item => item.sector === sector).idSector

        let data = {
            firstName: firstName,
            lastName: lastName,
            cpf: cpf,
            username: username,
            password: password == '' ? null : password,
            confirmationPassword: confirmationPassword == '' ? null : confirmationPassword,
            email: email,
            confirmationEmail: confirmationEmail,
            idSector: idSector,
            idProfile: idProfile
        }

        await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateUser/${idUser}`, data, token, setResult, 'Atualizado com sucesso')
        setIsModalOpen(true)
    }

    const deleteUser = async () => {
        let data = {
            deletionDate: new Date().toLocaleDateString('pt-BR')
        }

        await inactivateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/inactivateUser/${idUser}`, data, token, setResult, 'Deletado com sucesso')
        setIsModalOpen(true)

    }


    return (
        <section className="bg-gray-100 py-3 min-h-screen w-full">
            <div className="flex items-start mb-8 lg:px-2 sm:px-0">
                <button onClick={deleteUser} className="p-2 bg-indigo-500 rounded-lg text-white">Deletar</button>
            </div>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg" >
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Usuário</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Nome"} name={"firstName"} type={'text'} value={firstName} onchange={changeFirstName}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Sobrenome"} name={"lastName"} type={'text'} value={lastName} onchange={changeLastName}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"CPF"} name={"CPF"} type={'text'} value={cpf} onchange={changeCpf}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Usuário"} name={"username"} type={'text'} value={username} onchange={changeUsername}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Email"} name={"email"} type={'email'} value={email} onchange={changeEmail}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Confirmação do Email"} name={"email"} type={'email'} value={confirmationEmail} onchange={changeConfirmationEmail}></InputForm>
                    {permission.find(number => number == 14) && (
                        <>
                            <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Senha"} name={"password"} type={'password'} value={password} onchange={changePassword}></InputForm>
                            <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Confirmação da Senha"} name={"password"} type={'password'} value={confirmationPassword} onchange={changeConfirmationPassword}></InputForm>
                        </>
                    )}
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Setor'} name={'sector'} datas={listSector} value={sector} onchange={changeSector}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Perfil'} name={'profile'} datas={listProfile} value={profile} onchange={changeProfile}></InputSelect>
                </form>
                <div className="mb-6">
                    <button onClick={updateUser} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
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