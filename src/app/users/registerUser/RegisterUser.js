'use client'
import {useState } from "react";
import InputForm from "../../../../components/InputForm";
import InputSelect from "../../../../components/InputSelect";


export default function RegisterUser({ dataSector, dataProfile }) {

    const valueSector = []
    const valueProfile = []

    dataSector.map( item => {
        return valueSector.push(item.sector)
    })

    dataProfile.map(item => {
        return valueProfile.push(item.profile)
    })

    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cpf, setCpf] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmationEmail, setConfirmationEmail] = useState('')
    const [sector, setSector] = useState(valueSector[0])
    const [profile, setProfile] = useState(valueProfile[0])
    const [result, setResult] = useState('')

    const changeFirstName = (e) => { 
        setFirstName(e.target.value)
        
    }

    const changeLastName = (e) => { 
        setLastName(e.target.value)
    }

    const changeCpf = (e) => { 
        setCpf(e.target.value)
    }
   
    const changeUsername = (e) => { 
        setUsername(e.target.value)
    }
    
    const changePassword = (e) => { 
        setPassword(e.target.value)
    }

    const changeConfirmationPassword = (e) => { 
        setConfirmationPassword(e.target.value)
    }

    const changeEmail = (e) => { 
        setEmail(e.target.value)
    }

    const changeConfirmationEmail = (e) => { 
        setConfirmationEmail(e.target.value)
    }

    const changeSector = (e) => { 
        setSector(e.target.value)
        
    }
    
    const changeProfile = (e) => { 
        setProfile(e.target.value)
    }


    const addUser = async () => {

        let idProfile = []
        let idSector = []

        dataProfile.map(item => {
            if(item.profile == profile) {
                idProfile.push(item.idProfile)
            }
        })

        dataSector.map(item => {
            if(item.sector == sector) {
                idSector.push(item.idSector)
            }
        })

        const data = {
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
        
        console.log(JSON.stringify(data))

       await fetch('http://localhost:3001/addUser', {
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
        <section className="bg-gray-100 py-3 ">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg" >
                    <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Cadastro de Usuário</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Nome"} name={"firstName"} type={'text'} value={firstName} onchange={changeFirstName}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Sobrenome"} name={"lastName"} type={'text'} value={lastName} onchange={changeLastName}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"CPF"} name={"CPF"} type={'text'} value={cpf} onchange={changeCpf}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Usuário"} name={"username"} type={'text'} value={username} onchange={changeUsername}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'}  label={"Email"} name={"email"} type={'email'} value={email} onchange={changeEmail}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'}  label={"Confirmação do Email"} name={"email"} type={'email'} value={confirmationEmail} onchange={changeConfirmationEmail}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Senha"} name={"password"} type={'password'} value={password} onchange={changePassword}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Confirmação da Senha"} name={"password"} type={'password'} value={confirmationPassword} onchange={changeConfirmationPassword}></InputForm>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'}  label={'Setor'} name={'sector'} datas={valueSector} value={sector} onchange={changeSector}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'}  label={'Perfil'} name={'profile'} datas={valueProfile} value={profile} onchange={changeProfile}></InputSelect> 
                </form>
                <div className="mb-6">
                    <button onClick={addUser} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Cadastrar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}
