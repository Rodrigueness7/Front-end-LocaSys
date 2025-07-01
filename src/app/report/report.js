'use client'
import InputForm from "@/components/InputForm";
import Table from "@/components/table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Report({equipmentHistory, equipmentRental}) {


    const router = useRouter()
    const [initPeriod, setInitPeriod] = useState('')
    const [finishPeriod, setFinishPeriod] = useState('')
    const [dataReport, setDataReport] = useState('')
    const [showTable, setShowTable] = useState(false)

    const changeInitPeriod = (e) => {
        setInitPeriod(e.target.value)
    }

    const changeFinishPeriod = (e) => {
        setFinishPeriod(e.target.value)
    }

    if(equipmentRental.message) {
        router.push('./login')
    }
    

    const search = (e) => {
        e.preventDefault()
        
        let findInitPeriod = equipmentRental.find(item => item.initPeriod).initPeriod.slice(0,10)
        let findFinishPeriod = equipmentRental.find(item => item.finishPeriod).finishPeriod.slice(0,10)
    
        if(findInitPeriod != initPeriod && findFinishPeriod != finishPeriod ) {
            return(
                alert('Não há dados para esse periodo')
            )
        }

        const newDataEquipment = equipmentRental.map((item) => {
            
            const findEquipment = equipmentHistory.find(items => items['Equipment'].codProd == item.codProd)
       
        if (findEquipment) {

            if (findEquipment.entryDate.slice(0,10) >= initPeriod && findEquipment.entryDate.slice(0,10) <= finishPeriod) {

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

    setDataReport(newDataEquipment) 
    setShowTable(true)
    
    }

    const generation = (e) => {
        e.preventDefault()
        sessionStorage.setItem('equipments', JSON.stringify(dataReport))
        window.open(`/report/comparativeEquipment`, '_blank')
       
    }

    return(
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">
            <div className="flex justify-between mb-8 lg:px-8 sm:px-8 xl:w-1/2">
                <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={generation}>Gerar PDF</button>
            </div>
             <form className="ml-8 flex relative">
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Data inicial'} type={'date'} name={'initPeriod'} value={initPeriod} onchange={changeInitPeriod}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Data final'} type={'date'} name={'finshPeriod'} value={finishPeriod} onchange={changeFinishPeriod}></InputForm>
                <div className="mt-2">
                    <button onClick={search} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Buscar</button>
                </div>
            </form>
            {showTable && (
                <div className="ml-8 flex-1">
                    <Table Table={'table w-5/6 bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b '} Td={'py-2 px-4'} headers={['Código', 'Equipamento', 'Valor', 'Filial', 'Usuário', 'Setor']} data={dataReport} attributos={['codProd', 'equipment', 'value', 'branch', 'user', 'sector']} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'#'} bt={'...'}></Table>
                </div>
            )}   
        </div>

    )
    
}