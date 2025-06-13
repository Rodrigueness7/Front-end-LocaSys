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
    const [branch, setBranch] = useState('')
    const [username, setUsername] = useState('')
   
    const generation = async () => {
        sessionStorage.setItem('dataEquipment', JSON.stringify(dataEquipment))
        window.open(`/equipment/report`, '_blank')
    }


    const filter = () => {
        return tableEquipment.filter((item) => {
            return (
                (codProd ? item['Código'] == codProd : true) &&
                (equipment ? item['Equipamento'] === equipment : true) &&
                (type ? item['Tipo'] === type : true) &&
                (branch ? item['Filial'] === branch : true) &&
                (username ? item['Usuario'] === username : true)
            )
        })
    }

    const getOptions = (field, ignore = '') => {
        const dataFilter = tableEquipment.filter((item) => 
            (codProd && ignore != 'Código' ? item['Código'] == codProd.toString : true) &&
            (equipment && ignore != 'Equipamento' ? item['Equipamento'] === equipment : true) &&
            (type && ignore != 'Tipo' ? item['Tipo'] === type : true) &&
            (branch && ignore != 'Filial' ? item['Filial'] === branch: true) &&
            (username && ignore != 'Usuario' ? item['Usuario'] === username : true)
    )
       const options = dataFilter.map(item => item[field])
        return [... new Set(options)]
    }
    
    const optionsBranch = useMemo(() => getOptions('Filial', 'Filial'), [type, equipment, username])
    const optionsType = useMemo(() => getOptions('Tipo', 'Tipo'), [branch, equipment, username])
    const optionsEquipment = useMemo(() => getOptions('Equipamento', 'Equipamento'), [branch, type, username])
    const optionsUsername = useMemo(() => getOptions('Usuario', 'Usuario'), [branch, type, equipment])


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

    const changeBranch = (e) => {
        setBranch(e.target.value)
    }

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }


    const searchEquipment = (e) => {
        e.preventDefault()

        setDataEquipment(filter())
    }


    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen'>
            <div className="flex justify-between mb-8 lg:px-8 sm:px-8 xl:w-1/2">
                <Link href={'../equipment/registerEquipment'}><button className='p-2 bg-indigo-500 rounded-lg text-white'>Novo Equipamento</button></Link>
                <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={generation}>Gerar PDF</button>
            </div>
            <form className=" ml-8 flex relative" onSubmit={searchEquipment}>
                <InputForm   classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-32 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Código'} type={'text'} name={'codProd'} value={codProd} onchange={changeCodProd} maxLength={'10'}></InputForm>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-40 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Equipamento'} name={'equipment'} datas={optionsEquipment} value={equipment} onchange={changeEquipment}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-40 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Tipo'} name={'type'} datas={optionsType} value={type} onchange={changeType}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-40 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Filial'} name={'branch'} datas={optionsBranch} value={branch} onchange={changeBranch}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-40 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Usuário'} name={'username'} datas={optionsUsername} value={username} onchange={changeUsername}></InputSelect>
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