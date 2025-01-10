'use client'
import { useState } from "react"
import InputForm from "../../../../../components/InputForm"
import updateData from "../../../../../utils/updateData"
import inactivateData from "../../../../../utils/inactivateData"



export default function UpdateFilial({ dataFilial, idFilial, token }) {

    const [filial, setFiial] = useState(dataFilial.filial)
    const [CNPJ, setCNPJ] = useState(dataFilial.CNPJ)
    const [corporateName, setCoporateName] = useState(dataFilial.corporateName)
    const [uniqueIdentifier, setUniqueIdentifier] = useState(dataFilial.uniqueIdentifier)
    const [result, setResult] = useState('')

    const changeFilial = (e) => {
        let newFilial = e.target.value
        if (newFilial === '' || newFilial.length <= 25) {
            setFiial(newFilial)
        }
    }

    const changeCNPJ = (e) => {
        setCNPJ(dataFilial.CNPJ)

    }

    const changeCoporateName = (e) => {
        let newCoporateName = e.target.value
        if (newCoporateName === '' || newCoporateName.length <= 25) {
            setCoporateName(newCoporateName)
        }
    }

    const changeUniqueIdentifier = (e) => {
        setUniqueIdentifier(dataFilial.uniqueIdentifier)

    }

    const updateFilial = async () => {
        const data = {
            filial: filial,
            CNPJ: CNPJ,
            corporateName: corporateName,
            uniqueIdentifier: uniqueIdentifier
        }

        await updateData(`http://localhost:3001/updateFilial/${idFilial}`, data, token, setResult)

    }

    const deleteFilial = async () => {

        let data = {
            deletionDate: new Date().toLocaleDateString('pt-BR')
        }

        await inactivateData(`http://localhost:3001/inactivateFilial/${idFilial}`, data, token, setResult)
    }

    return (
        <section className="bg-gray-100 py-3 h-screen">
            <div className="flex items-start mb-8 lg:px-2 sm:px-0">
                <button onClick={deleteFilial} className="p-2 bg-indigo-500 rounded-lg text-white">Deletar</button>
            </div>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Filial</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Código Filial"} name={"uniqueIdentifier"} type={'number'} value={uniqueIdentifier} onchange={changeUniqueIdentifier}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Filial"} name={"filial"} type={'text'} value={filial} onchange={changeFilial}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"CNPJ"} name={"CNPJ"} type={'text'} value={CNPJ} onchange={changeCNPJ}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Razão Social"} name={"corporateName"} type={'text'} value={corporateName} onchange={changeCoporateName}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={updateFilial} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}