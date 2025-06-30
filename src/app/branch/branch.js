'use client'

import Table from "@/components/table"
import Link from "next/link"
import React from "react"

export default function Branch({ tableBranch }) {
    
    const data = tableBranch.map((item) => {
       let dataTable = {
        ['Código Filial'] : item.uniqueIdentifier,
        ['Filial'] : item.branch,
        ['CNPJ'] : item.CNPJ,
        ['Razão Social'] : item.corporateName
       }
       return dataTable
     })


     const generation = async () => {
            sessionStorage.setItem('dataBranch', JSON.stringify(data))
           window.open(`/branch/report`, '_blank') 
     }

    return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">
            <div className="flex justify-between mb-8 lg:px-8 sm:px-8 xl:w-1/2">
                <Link href={'../branch/registerBranch'}><button className='p-2 bg-indigo-500 rounded-lg text-white'>Nova Filial</button></Link>
                <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={generation}>Gerar PDF</button>
            </div>
            <div className="ml-8 flex-1">
                <Table Table={'table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Código Filial', 'Filial', 'CNPJ', 'Razão Social']} data={tableBranch} attributos={['uniqueIdentifier', 'branch', 'CNPJ', 'corporateName']} id={'idBranch'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./branch/updateBranch'} bt={'...'}></Table>
            </div>
        </div>

    )
}