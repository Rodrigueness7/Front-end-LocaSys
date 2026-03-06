'use client'
import Table from "@/components/table";
import orderData from "@/utils/orderData";
import { useState } from "react";

export default function Logs(data) {

    const [sortColumn, setSortColumn] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')

    const sortedData = orderData(data.data, sortColumn, sortDirection, setSortColumn, setSortDirection).sortedData
    const sortColumnState = orderData(data.data, sortColumn, sortDirection, setSortColumn, setSortDirection).sortColumn
    const sortDirectionState = orderData(data.data, sortColumn, sortDirection, setSortColumn, setSortDirection).sortDirection
    const handleSort = orderData(data.data, sortColumn, sortDirection, setSortColumn, setSortDirection).handleSort


       return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">
            <div className="ml-8 flex-1 h-[93%] overflow-x-auto w-3/5">
                <Table Table={'table-auto bg-white shadow-md rounded-lg w-full'} TrThead={'bg-gray-800 text-white text-nowrap rounded-lg'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4 text-black text-nowrap'} headers={['Usuário', 'Ação', 'Descrição', 'Data']} data={sortedData} attributos={['Usuário', 'Ação', 'Descrição', 'Data']} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'#'} bt={'...'} sortColumn={sortColumnState} sortDirection={sortDirectionState} handleSort={handleSort}></Table>
            </div>
        </div>
    )
}