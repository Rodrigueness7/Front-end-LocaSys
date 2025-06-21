'use client'
import InputForm from "@/components/InputForm";
import Table from "@/components/table";
import { useState } from "react";

export default function Report({equipment, equipmentRental}) {


    const [initPeriod, setInitPeriod] = useState('')
    const [finishPeriod, setFinishPeriod] = useState('')
    const [dataReport, setDataReport] = useState('')

    const changeInitPeriod = (e) => {
        setInitPeriod(e.target.value)
    }

    const changeFinishPeriod = (e) => {
        setFinishPeriod(e.target.value)
    }


    const search = (e) => {
        e.preventDefault()

        const newDataEquipment = equipmentRental.map((item) => {

        let findEquipment = equipment.find(itens => itens.codProd === item.codProd)

        if (findEquipment) {

            if (findEquipment.entryDate > item.initPeriod && findEquipment.entryDate < item.finishPeriod) {

                const data = {
                    id: item.idEquipmentRental,
                    codProd: item.codProd,
                    equipment: item.description,
                    value: item.value,
                    branch: findEquipment['Branch'].branch,
                    user: findEquipment['User'].username,
                    sector: findEquipment['Sector'].sector
                }
                return data
            }
        } else {
            const data = {
                id: item.idEquipmentRental,
                codProd: item.codProd,
                equipment: item.description,
                value: item.value,
                branch: '',
                user: '',
                sector: ''
            }

            return data
        }
    })

    }

    const generation = (e) => {
        e.preventDefault()
    }

    return(
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12">
            <div className="flex justify-between mb-8 lg:px-8 sm:px-8 xl:w-1/2">
                <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={generation}>Gerar PDF</button>
                <form>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Data inicial'} type={'date'} name={'initPeriod'} value={initPeriod} onchange={changeInitPeriod}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Data finaç'} type={'date'} name={'finshPeriod'} value={finishPeriod} onchange={changeFinishPeriod}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={search} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Buscar</button>
                </div>
            </div>
            <div className="ml-8 flex-1">
                <Table Table={'table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={['Código', 'Equipamento', 'Valor', 'Filial', 'Usuário']} data={dataReport} attributos={['codProd', 'equipment', 'value', 'branch', 'user']} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'#'} bt={'...'}></Table>
            </div>
        </div>

    )
    
}