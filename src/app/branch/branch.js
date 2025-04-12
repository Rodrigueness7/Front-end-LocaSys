'use client'

import Table from "@/components/table"
import Link from "next/link"

export default function Branch({ tableBranch }) {

    return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12">
            <div className="flex mb-8 lg:px-8 sm:px-8">
                <Link href={'../branch/registerBranch'}><button className='p-2 bg-indigo-500 rounded-lg text-white'>Nova Filial</button></Link>
            </div>
            <div className="ml-8 flex-1">
                <Table Table={'table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Código Filial', 'Filial', 'CNPJ', 'Razão Social']} data={tableBranch} attributos={['uniqueIdentifier', 'branch', 'CNPJ', 'corporateName']} id={'idBranch'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./branch/updateBranch'} bt={'...'}></Table>
            </div>
        </div>

    )
}