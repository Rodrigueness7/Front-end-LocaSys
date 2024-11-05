'use client'
import { useState } from "react";
import InputForm from "../../../components/InputForm";
import InputSelect from "../../../components/InputSelect";

export default function Register({ dataSector, dataFilial }) {
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cpf, setCpf] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmationEmail, setConfirmationEmail] = useState('')
    const [sector, setSector] = useState('')
    const [filial, setFilial] = useState('')
    
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
    
    const changeFilial = (e) => { 
        setFilial(e.target.value)
    }

    const valueSector = []
    const valueFilial = []
    dataSector.map(item => {
        return valueSector.push(item.sector)
    })

    dataFilial.map(item => {
        return valueFilial.push(item.filial)
    })

    const addUser = (e) => {
        e.preventDefault()
    
    }
    

    return (
        <section className="bg-gray-100">
            <div className="flex items-center justify-center flex flex-col h-screen" >
                <div>
                    <h1 className="font-sans pb-8 text-2xl pb-8 text-center">Registra a sua conta</h1>
                </div>
                <form className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"First name"} name={"firstName"} type={'text'} value={firstName} onchange={changeFirstName}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Last name"} name={"lastName"} type={'text'} value={lastName} onchange={changeLastName}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"CPF"} name={"CPF"} type={'text'} value={cpf} onchange={changeCpf}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Username"} name={"username"} type={'text'} value={username} onchange={changeUsername}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Password"} name={"password"} type={'password'} value={password} onchange={changePassword}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Confirmation Password"} name={"password"} type={'password'} value={confirmationPassword} onchange={changeConfirmationPassword}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Email"} name={"email"} type={'email'} value={email} onchange={changeEmail}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Confirmation Email"} name={"email"} type={'email'} value={confirmationEmail} onchange={changeConfirmationEmail}></InputForm>
                    <InputSelect classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} classNameLabel={"block"} label={'Setor'} name={'sector'} datas={valueSector} value={sector} onchange={changeSector}></InputSelect>
                    <InputSelect classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} classNameLabel={"block"} label={'Filial'} name={'filial'} datas={valueFilial} value={filial} onchange={changeFilial}></InputSelect> 
                </form>
                <div>
                    <button onClick={addUser} className="w-64 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Cadastrar</button>
                </div>
            </div>
        </section>
    )
}

