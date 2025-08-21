'use client'
import InputForm from "@/components/InputForm";
import InputSelect from "@/components/InputSelect";
import Table from "@/components/table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Report({equipmentHistory, equipmentRental}) {

    const options = [{id: 0, option: 'Comparativo Equipamentos'}, {id: 1, option: 'Comparativo de valor'}, {id: 2, option: 'Divergênia de valor'}]
    const listOption = options.map(item => item.option)
    const router = useRouter()
    const [initPeriod, setInitPeriod] = useState('')
    const [finishPeriod, setFinishPeriod] = useState('')
    const [dataReport, setDataReport] = useState('')
    const [showTable, setShowTable] = useState(false)
    const [report, setReport] = useState(listOption[0])

    const changeInitPeriod = (e) => {
        setInitPeriod(e.target.value)
    }

    const changeFinishPeriod = (e) => {
        setFinishPeriod(e.target.value)
    }

    const changeReport = (e) => {
        setReport(e.target.value)
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

        const comparativeEquipment = equipmentRental.map((item) => {
            
            const maxId = Math.max(...equipmentHistory.filter(items => items['Equipment'].codProd == item.codProd).map(itens => itens.idEquipmentHistory))
            const findEquipment = equipmentHistory.find(item => item.idEquipmentHistory === maxId)
            
        if (findEquipment) {
           
            if (findEquipment.entryDate.slice(0,10) >= initPeriod && findEquipment.entryDate.slice(0,10) <= finishPeriod) {
                const data = {
                    id: item.idEquipmentRental,
                    codProd: item.codProd,
                    equipment: item.description,
                    valueKm: item.value,
                    value: findEquipment.value,
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
                valueKm: item.value,
                branch: '',
                user: '',
                sector: ''
            }

            return data
        }
    })
     setDataReport(comparativeEquipment) 
     setShowTable(true)
    }

    

    const comparativeValue = equipmentRental.map(item => {
    
         const maxId = Math.max(...equipmentHistory.filter(items => items['Equipment'].codProd == item.codProd).map(itens => itens.idEquipmentHistory))
         const findValue = equipmentHistory.find(items => items.idEquipmentHistory === maxId && items.value == item.value)

       if(findValue) {
              if (findValue.entryDate.slice(0,10) >= initPeriod && findValue.entryDate.slice(0,10) <= finishPeriod) {
                const data = {
                    id: item.idEquipmentRental,
                    codProd: item.codProd,
                    equipment: item.description,
                    valueKm: item.value,
                    value: findValue.value,
                    branch: findValue['Branch'].branch,
                    user: findValue['User'].username,
                    sector: findValue['Sector'].sector
                }
                return data
            }
       }
             
    }).filter((item) => { return item != undefined})

    const divergetValue = equipmentRental.map(item => {
            const maxId = Math.max(...equipmentHistory.filter(items => items['Equipment'].codProd == item.codProd).map(itens => itens.idEquipmentHistory))
            const findDivergentValue = equipmentHistory.find(items => items.idEquipmentHistory === maxId && items.value != item.value)
          if(findDivergentValue) {
              if (findDivergentValue.entryDate.slice(0,10) >= initPeriod && findDivergentValue.entryDate.slice(0,10) <= finishPeriod) {
                const data = {
                    id: item.idEquipmentRental,
                    codProd: item.codProd,
                    equipment: item.description,
                    valueKm: item.value,
                    value: findDivergentValue.value,
                    branch: findDivergentValue['Branch'].branch,
                    user: findDivergentValue['User'].username,
                    sector: findDivergentValue['Sector'].sector
                }
                return data
            }
       }
     }).filter((item) => item != undefined)
    

    const generation = async (e) => {
        e.preventDefault()
         sessionStorage.setItem('equipments', JSON.stringify(dataReport))
         if(report == listOption[0]) {
            if(dataReport.length <= 0) {
                return alert('Não existe dados para gerar relatório')
            }
            window.open('/reportComparative/comparativeEquipment')   
        } else if(report == listOption[1]) {
         sessionStorage.setItem('comparativeValue', JSON.stringify(comparativeValue))
            if(comparativeValue.length <= 0) {
               return alert('Não existe valores iguais para gerar relatório')
            }
            window.open('/reportComparative/comparativeValue')  
        } else if(report == listOption[2]) {
            sessionStorage.setItem('divergetValue', JSON.stringify(divergetValue))
            if(divergetValue.length <= 0) {
                return alert('Não existe valores divergente para gerar relatório')
            }
            window.open('/reportComparative/divergentValue')
        }
    }

    return(
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">
            <div className="flex justify-between mb-8 lg:px-8 sm:px-8 xl:w-1/2">
                <form className="flex">
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Relatório'} name={'report'} datas={listOption} value={report} onchange={changeReport}></InputSelect>
                    <div className="mt-8 ml-4">
                        <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={generation}>Gerar Relatório</button>
                    </div>
                </form>  
            </div>
             <form className="ml-8 flex relative">
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Data inicial'} type={'date'} name={'initPeriod'} value={initPeriod} onchange={changeInitPeriod}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Data final'} type={'date'} name={'finshPeriod'} value={finishPeriod} onchange={changeFinishPeriod}></InputForm>
                <div className="mt-2 ml-4">
                    <button onClick={search} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Buscar</button>
                </div>
            </form>
            {showTable && (
                <div className="ml-8 flex-1">
                    <Table Table={'table w-5/6 bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b '} Td={'py-2 px-4 text-black'} headers={['Código', 'Equipamento', 'Valor K&M', 'Valor', 'Filial', 'Usuário', 'Setor']} data={dataReport} attributos={['codProd', 'equipment', 'valueKm', 'value', 'branch', 'user', 'sector']} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'#'} bt={'...'}></Table>
                </div>
            )}   
        </div>

    )
    
}