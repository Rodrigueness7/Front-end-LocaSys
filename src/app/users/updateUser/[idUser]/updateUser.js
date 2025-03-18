'use client'

import { useState } from "react"
import InputForm from "../../../../../components/InputForm"
import InputSelect from "../../../../../components/InputSelect"
import updateData from "../../../../../utils/updateData"
import inactivateData from "../../../../../utils/inactivateData"
import { useRouter } from 'next/navigation'




export default function UpdateUser({ dataUserId, dataSector, dataProfile, idUser, token }) {

   
    const valueSector = []
    const valueProfile = []

    dataSector.map(item => {
        return valueSector.push(item.sector)
    })

    dataProfile.map(item => {
        return valueProfile.push(item.profile)
    })

    

    const [firstName, setFirstName] = useState(dataUserId.firstName)
    const [lastName, setLastName] = useState(dataUserId.lastName)
    const [cpf, setCpf] = useState((dataUserId.cpf == null)? "" : dataUserId.cpf)
    const [username, setUsername] = useState(dataUserId.username)
    const [password, setPassword] = useState(dataUserId.password)
    const [confirmationPassword, setConfirmationPassword] = useState(dataUserId.password)
    const [email, setEmail] = useState((dataUserId.email == null)? "" : dataUserId.email)
    const [confirmationEmail, setConfirmationEmail] = useState((dataUserId.email == null)? "" : dataUserId.email)
    const [sector, setSector] = useState(dataUserId['Sector'].sector)
    const [profile, setProfile] = useState(dataUserId['Profile'].profile)
    const [result, setResult] = useState('')
    const router = useRouter()
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    

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

    const handleSuccess = () => {
        setShowSuccessMessage(true)

        setTimeout(() => {
            setShowSuccessMessage(false)
        }, 3000)
    }

    const updateUser = async () => {
        let idSector = []
        let idProfile = []

        dataSector.map(values => {
            if (values.sector == sector) {
                idSector.push(values.idSector)
            }
        })

        dataProfile.map(values => {
            if (values.profile == profile) {
                idProfile.push(values.idProfile)
            }
        })

        let data = {
            firstName: firstName,
            lastName: lastName,
            cpf: cpf,
            username: username,
            password: password,
            confirmationPassword: confirmationPassword,
            email: email,
            confirmationEmail: confirmationEmail,
            idSector: idSector[0],
            idProfile: idProfile[0]
        }

        await updateData(`http://localhost:3001/updateUser/${idUser}`, data, token, setResult)
        setTimeout(() => {
            router.push('../')
        }, 2000)

        handleSuccess()
    }

    const deleteUser = async () => {
        let data = {
            deletionDate: new Date().toLocaleDateString('pt-BR')
        }

        await inactivateData(`http://localhost:3001/inactivateUser/${idUser}`, data, token, setResult)
        setTimeout(() => {
            router.push('../')
        }, 2000)

    }


    return (
        <section className="bg-gray-100 py-3 min-h-screen">
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
                  {password && confirmationPassword !== undefined ? (
                    <>
                      <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Senha"} name={"password"} type={'password'} value={password} onchange={changePassword}></InputForm>
                      <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Confirmação da Senha"} name={"password"} type={'password'} value={confirmationPassword} onchange={changeConfirmationPassword}></InputForm>
                    </>  
                  ): null}
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Setor'} name={'sector'} datas={valueSector} value={sector} onchange={changeSector}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Perfil'} name={'profile'} datas={valueProfile} value={profile} onchange={changeProfile}></InputSelect>
                </form>
                <div className="mb-6">
                    <button onClick={updateUser} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
                </div>
                {showSuccessMessage && (
                    <div className="flex items-center justify-center p-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-md text-lg font-semibold">
                        {result}
                    </div>
                )}
            </div>
        </section>
    )

}