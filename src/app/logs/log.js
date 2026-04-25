'use client'
import InputForm from "@/components/InputForm";
import InputSelect from "@/components/InputSelect";
import Table from "@/components/table";
import orderData from "@/utils/orderData";
import { useState, useCallback, useMemo } from "react";

export default function Logs(data) {

    const [sortColumnState, setSortColumnState] = useState('')
    const [sortDirectionState, setSortDirectionState] = useState('asc')
    const [dataState, setDataState] = useState(data.data)
    const {sortedData, handleSort, sortColumn, sortDirection} = orderData(dataState, sortColumnState, sortDirectionState, setSortColumnState, setSortDirectionState)
    const [user, setUser] = useState('')
    const [action, setAction] = useState('')
    const [initDate, setInitDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const toIso = d => d.split('/').reverse().join('-')

    const handleUser = (e) => {
        setUser(e.target.value)
    }

    const handleAction = (e) => {
        setAction(e.target.value)
    }

    const handleInitDate = (e) => {
        setInitDate(e.target.value)
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value)
    }



    const filterLog = () => {
        return data.data.filter((item) => {
            return(
                (user ? item['Usuário'] == user : true) &&
                (action ? item['Ação'] === action : true) &&
                (initDate ? toIso(item['Data']) >= toIso(initDate) : true) &&
                (endDate ? toIso(item['Data']) <= toIso(endDate) : true) 
            )
        })
    }
    
    const getOptions = useCallback((field, ignore = '') => {
        const dataFilter = data.data.filter((item) =>
            (user && ignore != 'Usuário' ? item['Usuário'] == user : true) &&
            (action && ignore != 'Ação' ? item['Ação'] === action : true)
        );
        const options = dataFilter.map(item => item[field]);
        return [...new Set(options)];
    }, [user, action, data.data]);

     const optionsUser = useMemo(() => getOptions('Usuário', 'Usuário'), [getOptions]).sort((a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });

    const optionsAction = useMemo(() => getOptions('Ação', 'Ação'), [getOptions]).sort((a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });

    const searchLog = (e) => {
        if(initDate > endDate) {
            alert('Data inicial não pode ser maior que data final.')
            return
        }
        e.preventDefault()
        setDataState(filterLog())
    }
    
   
       return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">
            <form onSubmit={searchLog} className="flex items-center mb-4 ml-8">
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-40 min-w-[160px] max-w-[200px] px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Usuário'} name={'user'} datas={optionsUser} value={user} onchange={handleUser} required={false}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-45 min-w-[160px] max-w-[250px] px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Ação'} name={'action'} datas={optionsAction} value={action} onchange={handleAction} required={false}></InputSelect>
                <InputForm classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-40 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Data Inicial'} type={'date'} name={'initDate'} value={initDate} onchange={handleInitDate} required={endDate !== '' ? true : false}></InputForm>
                <InputForm classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-40 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Data Final'} type={'date'} name={'endDate'} value={endDate} onchange={handleEndDate} required={initDate !== '' ? true : false}></InputForm>
                <button type="submit" className="px-4 py-3 bg-indigo-500 rounded-lg text-white mt-2">Pesquisar</button>
            </form>
            <div className="ml-8 flex-1 h-[80%] overflow-x-auto w-3/5">
                <Table Table={'table-auto bg-white shadow-md rounded-lg w-full'} TrThead={'bg-gray-800 text-white text-nowrap rounded-lg'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4 text-black text-nowrap'} headers={['Usuário', 'Ação', 'Descrição', 'Data']} data={sortedData} attributos={['Usuário', 'Ação', 'Descrição', 'Data']} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'#'} bt={'...'} sortColumn={sortColumn} sortDirection={sortDirection} handleSort={handleSort}></Table>
            </div>
        </div>
    )
}