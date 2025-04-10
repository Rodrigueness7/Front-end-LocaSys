'use client'

import InputForm from "@/components/InputForm"
import InputSelect from "@/components/InputSelect"
import Table from "@/components/table"
import Link from "next/link"
import { useMemo, useState } from "react"

export default function Equipment({ tableEquipment, attribute }) {


    const [dataEquipment, setDataEquipment] = useState(tableEquipment)
    const [codProd, setCodProd] = useState('')
    const [equipment, setEquipment] = useState('')
    const [type, setType] = useState('')
    const [filial, setFilial] = useState('')
    const [username, setUsername] = useState('')


    const filtrar = () => {
        return tableEquipment.filter((itens) => {
            return (
                (codProd ? itens['Código'] == codProd : true) &&
                (equipment ? itens['Equipamento'] === equipment : true) &&
                (type ? itens['Tipo'] === type : true) &&
                (filial ? itens['Filial'] === filial : true) &&
                (username ? itens['Usuario'] === username : true)
            )
        })
    }

    const obterOpcoes = (campo, ignorar = '') => {
        const filtraDados = tableEquipment.filter((item) => 
            (codProd && ignorar != 'Código' ? item['Código'] == codProd.toString : true) &&
            (equipment && ignorar != 'Equipamento' ? item['Equipamento'] === equipment : true) &&
            (type && ignorar != 'Tipo' ? item['Tipo'] === type : true) &&
            (filial && ignorar != 'Filial' ? item['Filial'] === filial: true) &&
            (username && ignorar != 'Usuario' ? item['Usuario'] === username : true)
    )
       const opcoes = filtraDados.map(item => item[campo])
        return [... new Set(opcoes)]
    }
    
    const opcoesFiliais = useMemo(() => obterOpcoes('Filial', 'Filial'), [type, equipment, username])
    const opcoesTipo = useMemo(() => obterOpcoes('Tipo', 'Tipo'), [filial, equipment, username])
    const opcoesEquipamento = useMemo(() => obterOpcoes('Equipamento', 'Equipamento'), [filial, type, username])
    const opcoesUsuario = useMemo(() => obterOpcoes('Usuario', 'Usuario'), [filial, type, equipment])


    const changeCodProd = (e) => {
        const newValue = e.target.value

        if (/^[0-9]*$/.test(newValue) && newValue.length <= 10) {
            setCodProd(newValue)
        }
    }

    const changeEquipment = (e) => {
        setEquipment(e.target.value)

    }


    const changeType = (e) => {
        setType(e.target.value)

    }

    const changeFilial = (e) => {
        setFilial(e.target.value)
    }

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }


    const searchEquipment = (e) => {
        e.preventDefault()

        setDataEquipment(filtrar())

    }

    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen'>
            <div className="flex mb-8 lg:px-8 sm:px-8">
                <Link href={'../equipment/registerEquipment'}>
                    <button className='p-2 bg-indigo-500 rounded-lg text-white'>Novo Equipamento</button>
                </Link>
            </div>
            <form className=" ml-8 flex relative" onSubmit={searchEquipment}>
                <InputForm   classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Código'} type={'text'} name={'codProd'} value={codProd} onchange={changeCodProd} maxLength={'10'}></InputForm>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Equipamento'} name={'equipment'} datas={opcoesEquipamento} value={equipment} onchange={changeEquipment}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Tipo'} name={'type'} datas={opcoesTipo} value={type} onchange={changeType}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Filial'} name={'filial'} datas={opcoesFiliais} value={filial} onchange={changeFilial}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Usuário'} name={'username'} datas={opcoesUsuario} value={username} onchange={changeUsername}></InputSelect>
                <div className="flex items-center ml-2 mt-2">
                    <button className='p-3 bg-indigo-500 rounded-lg text-white' type="submit">Buscar</button>
                </div>
            </form>
            <div className='ml-8 flex-1'>
                <Table Table={'table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={attribute} data={dataEquipment} attributos={attribute} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./equipment/updateEquipment'} bt={'...'}></Table>
            </div>
        </div>
    )
}