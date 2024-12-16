'use client'
import { useEffect, useState } from "react";
import InputForm from "../../../../components/InputForm";
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation";


export default function RegisterFilial() {
    const router = useRouter()

    useEffect(() =>{
        let token = getCookie('token')
        if(!token) {
            router.push('../login')
        }
    }, [])

    const [filial, setFiial] = useState('')
    const [CNPJ, setCNPJ] = useState('')
    const [corporateName, setCoporateName] = useState('')
    const [uniqueIdentifier, setUniqueIdentifier] = useState('')
    const [result, setResult] = useState('')


    const changeFilial = (e) => {
        let newFilial = e.target.value
        if(newFilial === '' || newFilial.length <= 25) {
            setFiial(newFilial)
        }
    }

    const changeCNPJ = (e) => {
        let newCNPJ = e.target.value
        if(newCNPJ === '' || newCNPJ.length <= 14) {
            setCNPJ(newCNPJ)
        }
    }

    const changeCoporateName = (e) => {
        let newCoporateName = e.target.value
        if(newCoporateName === '' || newCoporateName.length <= 25) {
            setCoporateName(newCoporateName)
        } 
    }

    const changeUniqueIdentifier = (e) => {
        let newUniqueIdentifier = e.target.value
        if(newUniqueIdentifier === '' || newUniqueIdentifier.length <= 11) {
            setUniqueIdentifier(newUniqueIdentifier)
        }
    }

    const addFilial = async () => {

        const data = {
            filial: filial,
            CNPJ: CNPJ,
            corporateName: corporateName,
            uniqueIdentifier: uniqueIdentifier
        }

        await fetch('http://localhost:3001/addFilial', {
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
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Cadastro da Filial</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Código Filial"} name={"uniqueIdentifier"} type={'number'} value={uniqueIdentifier} onchange={changeUniqueIdentifier}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Filial"} name={"filial"} type={'text'} value={filial} onchange={changeFilial}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"CNPJ"} name={"CNPJ"} type={'text'} value={CNPJ} onchange={changeCNPJ}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Razão Social"} name={"corporateName"} type={'text'} value={corporateName} onchange={changeCoporateName}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={addFilial} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Cadastrar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}