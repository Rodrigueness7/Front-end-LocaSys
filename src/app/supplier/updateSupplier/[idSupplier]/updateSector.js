'use client'

import { useState } from "react"
import InputSelect from "../../../../../components/InputSelect"
import InputForm from "../../../../../components/InputForm"

export default function UpdateSector({ idSector, dataSector, dataFilial, token }) {

    let newFilial = []

    dataFilial.map(itens => {
        newFilial.push(itens.filial)
    })

    const [sector, setSector] = useState(dataSector.sector)
    const [filial, setFilial] = useState(dataSector.filial)
    const [result, setResult] = useState()

    const changeSector = (e) => {
        setSector(e.target.value)
    }

    const changeFilial = (e) => {
        setFilial(e.target.value)
    }

    const updateFilial = async () => {

    }

    return (
        <section className="bg-gray-100 py-3 h-screen">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Setor</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Filial'} name={'filial'} datas={newFilial} value={filial} onchange={changeFilial}></InputSelect>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Setor'} type={'text'} name={'sector'} value={sector} onchange={changeSector}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={updateFilial} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}