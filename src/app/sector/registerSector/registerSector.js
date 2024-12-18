'use client'

import { useState } from "react"
import InputForm from "../../../../components/InputForm"
import InputSelect from "../../../../components/InputSelect"

export default function PageRegisterSector({ dataFilial }) {
    const newFilial = dataFilial
    let data = []
    newFilial.map(itens => {
        data.push(itens.filial)
    })

    const [sector, setSector] = useState('')
    const [filial, setFilial] = useState(data[0])
    const [result, setResult] = useState()

    const changeSector = (e) => {
        setSector(e.target.value)
    }

    const changeFilial = (e) => {
        setFilial(e.target.value)
    }

    const addSector = async () => {
        let idFilial = []
        dataFilial.map((itens) => {
            if (itens.filial === filial) {
                idFilial.push(itens.idFilial)
            }
        })

        const data = {
            idFilial: idFilial[0],
            sector: sector
        }

        console.log(JSON.stringify(data))

        await fetch('http://localhost:3001/addSector', {
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
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Adicionar Setor</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Filial'} name={'filial'} datas={data} value={filial} onchange={changeFilial}></InputSelect>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Setor'} type={'text'} name={'sector'} value={sector} onchange={changeSector}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={addSector} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Cadastrar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}