'use client'

import InputForm from "@/components/InputForm"
import InputSelect from "@/components/InputSelect"
import Table from "@/components/table"
import Link from "next/link"
import { useMemo, useState } from "react"


export default function Branch({ tableBranch }) {

    const [dataBranch, setDataBranch] = useState(tableBranch)
    const [branch, setBranch] = useState('')
    const [uniqueIdentifier, setUniqueIdentifier] = useState('')
    const [CNPJ, setCNPJ] = useState('')

    const filtrar = () => {
        return tableBranch.filter((item) => {
            return (
                (branch ? item.branch === branch : true) &&
                (uniqueIdentifier ? item.uniqueIdentifier == uniqueIdentifier : true) &&
                (CNPJ ? item['CNPJ'] === CNPJ : true)
            )
        })
    }

    const obterOpcoes = (campo, ignorar = '') => {
        const filtraDados = tableBranch.filter((item) => 
            (branch && ignorar != 'branch' ? item.branch === branch : true) &&
            (uniqueIdentifier && ignorar != 'uniqueIdentifier' ? item.uniqueIdentifier == uniqueIdentifier : true) &&
            (CNPJ && ignorar != 'CNPJ' ? item['CNPJ'] === item['CNPJ'] : true)
        )

        const opcoes = filtraDados.map( item => item[campo])
        return [... new Set(opcoes)]
    }

    const opcoesBranch = useMemo(() => obterOpcoes('branch', 'branch'), [CNPJ])
    const opcoesCNPJ = useMemo(() => obterOpcoes('CNPJ', 'CNPJ'), [branch])
   


    const changeBranch = (e) => {
        let fieldBranch = e.target.value
        if (fieldBranch === '' || fieldBranch.length <= 25) {
            setBranch(fieldBranch)
        }
    }

    const changeUniqueIdentifier = (e) => {
        let fieldUniqueIdentifier = e.target.value
        if (fieldUniqueIdentifier === '' || fieldUniqueIdentifier.length <= 11) {
            setUniqueIdentifier(fieldUniqueIdentifier)
        }
    }

    const changeCNPJ = (e) => {
        let fieldCNPJ = e.target.value
        if (fieldCNPJ === '' || fieldCNPJ.length <= 14) {
            setCNPJ(fieldCNPJ)
        }
    }

    const searchBranch = (e) => {
        e.preventDefault()
        
        setDataBranch(filtrar())

    }


    return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12">
            <div className="flex mb-8 lg:px-8 sm:px-8">
                <Link href={'../branch/registerBranch'}><button className='p-2 bg-indigo-500 rounded-lg text-white'>Nova Filial</button></Link>
            </div>
            <form className=" ml-8 flex relative" onSubmit={searchBranch}>
                <InputForm   classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Código Filial'} type={'text'} name={'uniqueIdentifier'} value={uniqueIdentifier} onchange={changeUniqueIdentifier}></InputForm>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Filial'} name={'branch'} datas={opcoesBranch} value={branch} onchange={changeBranch}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'CNPJ'} name={'CNPJ'} datas={opcoesCNPJ} value={CNPJ} onchange={changeCNPJ}></InputSelect>
                <div className="flex items-center ml-2 mt-2">
                    <button className='p-3 bg-indigo-500 rounded-lg text-white' type="submit">Buscar</button>
                </div>
            </form>
            <div className="ml-8 flex-1">
                <Table Table={'table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Código Filial', 'Filial', 'CNPJ', 'Razão Social']} data={dataBranch} attributos={['uniqueIdentifier', 'branch', 'CNPJ', 'corporateName']} id={'idBranch'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./branch/updateBranch'} bt={'...'}></Table>
            </div>
        </div>

    )
}