'use client'

import { useState } from "react"
import InputForm from "../../../../components/InputForm"

export default  function PageRegisterSector({ dataFilial }) {
    const newFilial = dataFilial
    let data = []
    newFilial.map(itens => {
        data.push(itens.filial)
    })

    const [sector, setSector] = useState()
    const [filial, setFilial] = useState()

    const changeSector = (e) => {
        setSector(e.target.value)
    }

    const changeFilial = (e) => {
        setFilial(e.target.value)
    }

    return (
        <section className="bg-gray-100 py-3 h-screen">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Adicionar Setor</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Filial'} type={'text'} name={'filial'} value={filial} onchange={changeFilial}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Setor'} type={'text'} name={'sector'} value={sector} onchange={changeSector}></InputForm>
                </form>
            </div>
        </section>
    )
}