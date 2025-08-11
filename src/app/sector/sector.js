'use client'

import InputForm from "@/components/InputForm"
import InputSelect from "@/components/InputSelect"
import Table from "@/components/table"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"

export default function Sector({ tableSector }) {

    const [dataSector, setDataSector] = useState(tableSector)
    const [id, setId] = useState('')
    const [sector, setSector] = useState('')
    const [branch, setBranch] = useState('')
    const [permission, setPermission] = useState([])
    
    
        useEffect(() => {
            let data = localStorage.getItem('permission')
            let number = data.split(',').map(number => number)
            setPermission(number)
            
        }, [])

    let data = dataSector.map((item) => {
        let dataTable = {
            ['id'] : item.idSector,
            ['Setor'] : item.sector,
            ['Filial'] : item.branch
        }
        return dataTable
    })

   

    const filter = () => {
        return tableSector.filter((item) => {
            return (
                (id ? item.idSector == id : true) &&
                (sector ? item.sector === sector : true) &&
                (branch ? item.branch === branch : true)
            )
        })
    }

    const getOptions = useCallback((field, ignore) => {
        const dataFilter = tableSector.filter((item) =>
            (sector && ignore != 'sector' ? item.sector === sector : true) &&
            (branch && ignore != 'branch' ? item.branch === branch : true)
        )

        const options = dataFilter.map(item => item[field])
        return [... new Set(options)]
    }, [branch, sector, tableSector]);

    const optionsSector = useMemo(() => getOptions('sector', 'sector'), [getOptions])
    const optionsBranch = useMemo(() => getOptions('branch', 'branch'), [getOptions])

    const changeId = (e) => {setId(e.target.value)}

    const changeSector = (e) => {setSector(e.target.value)}

    const changeBranch = (e) => {setBranch(e.target.value)}

    const searchSector = (e) => {
        e.preventDefault()
        setDataSector(filter())
    }

    const generation = async () => {
        sessionStorage.setItem('dataSector', JSON.stringify(data))
       window.open(`/sector/report`, '_blank') 
 }

    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen w-full'>
            <div className="flex justify-between mb-8 lg:px-8 sm:px-8 xl:w-1/2">
                {permission.find(number => number == '20') && (
                    <Link href={'../sector/registerSector'}><button className='p-2 bg-indigo-500 rounded-lg text-white'>Novo Setor </button></Link>
                )}
                <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={generation}>Gerar Relatório</button>
            </div>
            <form className=" ml-8 flex relative" onSubmit={searchSector}>
                <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-24 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={"Id"} name={"idSector"} type={'text'} value={id} onchange={changeId}></InputForm>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Setor'} name={'sector'} datas={optionsSector} value={sector} onchange={changeSector}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Filial'} name={'branch'} datas={optionsBranch} value={branch} onchange={changeBranch}></InputSelect>
                <div className="flex items-center ml-2 mt-2">
                    <button className='p-3 bg-indigo-500 rounded-lg text-white' type="submit">Buscar</button>
                </div>
            </form>
            <div className='flex-1 ml-8'>
                <Table Table={' table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['id', 'Setor', 'Filial']} data={dataSector} attributos={['idSector', 'sector', 'branch']} id={'idSector'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./sector/updateSector'} bt={'...'} permission={permission.find(number => number == '21')}></Table>
            </div>
        </div>
    )
}