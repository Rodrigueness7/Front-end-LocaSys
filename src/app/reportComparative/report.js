'use client'
import InputForm from "@/components/InputForm";
import InputSelect from "@/components/InputSelect";
import Table from "@/components/table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Report({ equipmentHistory, equipmentRental, branch }) {

    const options = [{ id: 0, option: 'Comparativo Equipamentos' }, { id: 1, option: 'Valores iguais' }, { id: 2, option: 'Divergênia de valores' }, { id: 3, option: 'Equipamentos Divergentes' }]
    const listOption = options.map(item => item.option)
    const listBranch = branch.map(item => item.branch)
    const router = useRouter()
    const [initPeriod, setInitPeriod] = useState('')
    const [finishPeriod, setFinishPeriod] = useState('')
    const [dataReport, setDataReport] = useState('')
    const [showTable, setShowTable] = useState(false)
    const [report, setReport] = useState(listOption[0])
    const [branchSelected, setBranchSelected] = useState('')
    const [isCheked, setIsChecked] = useState(false)
  
   
    
    
    const period = equipmentRental.filter(item => {
       const idMax = Math.max(...equipmentRental.filter(itens => itens['Branch'].branch === item['Branch'].branch).map(i => i.idEquipmentRental))
        if(item.idEquipmentRental === idMax) {
            return item
        }
    })


    const changeInitPeriod = (e) => {
        setInitPeriod(e.target.value)
    }

    const changeFinishPeriod = (e) => {
        setFinishPeriod(e.target.value)
    }

    const changeReport = (e) => {
        setReport(e.target.value)
    }

    const changeBranch = (e) => {
        setBranchSelected(e.target.value)
    }

    if (equipmentRental.message) {
        router.push('/login')
    }

     const handleCheckboxChange = (e) => {
        setIsChecked(prev => !prev)
    }

    const headquarter = branch.find(item => item.headquarter == item.idBranch).idBranch
    
    let filterEquipmentHistory = branchSelected != '' ? equipmentHistory.filter( items => equipmentRental.some( itens => itens.value == items.value && itens.codProd == items['Equipment'].codProd && items.entryDate <= finishPeriod && (items.returnDate == null || items.returnDate <= finishPeriod) && items['Branch'].branch == branchSelected)) : equipmentHistory.filter( items => equipmentRental.some( itens => itens.value == items.value && itens.codProd == items['Equipment'].codProd && items.entryDate <= finishPeriod && (items.returnDate == null || items.returnDate <= finishPeriod)))

    if (isCheked && branchSelected != '') {
        filterEquipmentHistory = branchSelected != '' ? equipmentHistory.filter( items => equipmentRental.some( itens => itens.value == items.value && itens.codProd == items['Equipment'].codProd && items.entryDate <= finishPeriod && (items.returnDate == null || items.returnDate <= finishPeriod) && items['Branch'].headquarter == headquarter)) : equipmentHistory.filter( items => equipmentRental.some( itens => itens.value == items.value && itens.codProd == items['Equipment'].codProd && items.entryDate <= finishPeriod && (items.returnDate == null || items.returnDate <= finishPeriod)))

    }


    const equipmentDiverget = filterEquipmentHistory.map(items => {
        const maxIdEquip = Math.max(...equipmentHistory.filter(itens => itens['Equipment'].codProd == items['Equipment'].codProd && items['Equipment'].codProd != null).map(i => i.idEquipmentHistory))
        let data

        if (items.idEquipmentHistory === maxIdEquip) {
            
            return data = {
                id: items.idEquipmentHistory,
                codProd: items['Equipment'].codProd,
                equipment: items['Equipment'].equipment,
                valueKm: '',
                value: items.value,
                branch: items['Branch'].branch,
                entryDateKM: '',
                entryDate: items.entryDate == null ? '' : new Date(items.entryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                returnDateKM: '',
                returnDate: items.returnDate == null ? '' : new Date(items.returnDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                user: items['User'].username,
                sector: items['Sector'].sector
            }

            
        }
    })
    const equipmentDivergetFiltered = equipmentDiverget.filter(item => item != undefined)


    const comparativeEquipment = equipmentRental.filter(item => item.initPeriod.slice(0, 10) == initPeriod && item.finishPeriod.slice(0, 10) == finishPeriod).map(item => {
        const maxId = Math.max(...equipmentHistory.filter(items => items['Equipment'].codProd == item.codProd).map(itens => itens.idEquipmentHistory))
        let filterEquipment = []
        if (branchSelected == '') {
            filterEquipment = equipmentHistory.filter(items => items['Equipment'].codProd == item.codProd && items.idEquipmentHistory === maxId)
        } else if (branchSelected != '' && isCheked) {
            filterEquipment = equipmentHistory.filter(items => items['Equipment'].codProd == item.codProd && items.idEquipmentHistory === maxId && items['Branch'].headquarter == headquarter)
        } else {
            filterEquipment = equipmentHistory.filter(items => items['Equipment'].codProd == item.codProd && items.idEquipmentHistory === maxId && items['Branch'].branch == branchSelected)
        }

        let data

        if (filterEquipment.length > 0 && filterEquipment[0].entryDate <= finishPeriod && (filterEquipment[0].returnDate == null || filterEquipment[0].returnDate <= finishPeriod)) {

            return data = {
                id: item.idEquipmentRental,
                codProd: item.codProd,
                equipment: item.description,
                valueKm: item.value,
                value: filterEquipment[0].value,
                branch: filterEquipment[0]['Branch'].branch,
                entryDateKM: item.init == null ? '' : new Date(item.init).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                entryDate: filterEquipment[0].entryDate == null ? '' : new Date(filterEquipment[0].entryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                returnDateKM: item.finish == null ? "" : new Date(item.finish).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                returnDate: filterEquipment[0].returnDate == null ? "" : new Date(filterEquipment[0].returnDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                user: filterEquipment[0]['User'].username,
                sector: filterEquipment[0]['Sector'].sector

            }
        } else {
            return data = {
                id: item.idEquipmentRental,
                codProd: item.codProd,
                equipment: item.description,
                valueKm: item.value,
                value: '',
                branch: '',
                entryDateKM: item.init == null ? "" : new Date(item.init).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                entryDate: '',
                returnDateKM: item.finish == null ? "" : new Date(item.finish).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                returnDate: '',
                user: '',
                sector: ''
            }
        }
    }).sort((a, b) => {
    const hasValueA = a.value !== null && a.value !== '' && a.value !== undefined
    const hasValueB = b.value !== null && b.value !== '' && b.value !== undefined

    if (hasValueA && !hasValueB) return 1
    if (!hasValueA && hasValueB) return -1
    return 0
})




     const comparativeValue = filterEquipmentHistory.map( items => {
        const maxId = Math.max(...equipmentHistory.filter(itens => itens['Equipment'].codProd == items['Equipment'].codProd).map(i => i.idEquipmentHistory))
        let data

        if (items.idEquipmentHistory === maxId) {
            return data = {
                id: items.idEquipmentHistory,
                codProd: items['Equipment'].codProd,
                equipment: items['Equipment'].equipment,
                valueKm: equipmentRental.find(iten => iten.codProd == items['Equipment'].codProd && iten.value == items.value).value,
                value: items.value,
                branch: items['Branch'].branch,
                entryDateKM: equipmentRental.find(iten => iten.codProd == items['Equipment'].codProd && iten.value == items.value).init == null ? '' : new Date(equipmentRental.find(iten => iten.codProd == items['Equipment'].codProd && iten.value == items.value).init).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                entryDate: items.entryDate == null ? '' : new Date(items.entryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                returnDateKM: equipmentRental.find(iten => iten.codProd == items['Equipment'].codProd && iten.value == items.value).finish == null ? "" : new Date(equipmentRental.find(iten => iten.codProd == items['Equipment'].codProd && iten.value == items.value).finish).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),  
                returnDate: items.returnDate == null ? "" : new Date(items.returnDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                user: items['User'].username,
                sector: items['Sector'].sector
        }
     }
    })

    const comparativeValueFiltered = comparativeValue.filter( item => item != undefined)


    const filterDivergetValue = branchSelected != '' ? equipmentHistory.filter( items => equipmentRental.some( itens => itens.value != items.value && itens.codProd == items['Equipment'].codProd && items.entryDate <= finishPeriod && (items.returnDate == null || items.returnDate <= finishPeriod) && items['Branch'].branch == branchSelected)) : equipmentHistory.filter( items => equipmentRental.some( itens => itens.value != items.value && itens.codProd == items['Equipment'].codProd && items.entryDate <= finishPeriod && (items.returnDate == null || items.returnDate <= finishPeriod)))

    const divergetValue = filterDivergetValue.map( items => {
        const maxId = Math.max(...equipmentHistory.filter(itens => itens['Equipment'].codProd == items['Equipment'].codProd).map(i => i.idEquipmentHistory))
        let data
        
        if (items.idEquipmentHistory === maxId) {
            return data = {
                id: items.idEquipmentHistory,
                codProd: items['Equipment'].codProd,
                equipment: items['Equipment'].equipment,
                valueKm: equipmentRental.find(iten => iten.codProd == items['Equipment'].codProd && iten.value !== items.value).value,
                value: items.value,
                branch: items['Branch'].branch,
                entryDateKM: equipmentRental.find(iten => iten.codProd == items['Equipment'].codProd && iten.value !== items.value).init == null ? '' : new Date(equipmentRental.find(iten => iten.codProd == items['Equipment'].codProd && iten.value != items.value).init).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                entryDate: items.entryDate == null ? '' : new Date(items.entryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                returnDateKM: equipmentRental.find(iten => iten.codProd == items['Equipment'].codProd && iten.value != items.value).finish == null ? "" : new Date(equipmentRental.find(iten => iten.codProd == items['Equipment'].codProd && iten.value != items.value).finish).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                returnDate: items.returnDate == null ? "" : new Date(items.returnDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
                user: items['User'].username,
                sector: items['Sector'].sector
                
        }
    }})
    const divergetValueFiltered = divergetValue.filter( item => item != undefined)


    const search = (e) => {
        e.preventDefault()


        if (equipmentRental.length == 0) {
            return (
                alert('Não há dados para comparar')
            )
        }

        let findInitPeriod = equipmentRental.filter(item => item.initPeriod.slice(0,10) === initPeriod)
        let findFinishPeriod = equipmentRental.filter(item => item.finishPeriod.slice(0,10) === finishPeriod)

     

        if (findInitPeriod.length == 0 || findFinishPeriod.length == 0) {
            return (
                alert('Não há dados para esse periodo')
            )
        }


        if (report == listOption[0]) {
            setDataReport(comparativeEquipment)
            setShowTable(true)
        }

        if (report == listOption[1]) {
            setDataReport(comparativeValueFiltered)
            setShowTable(true)
        }

        if (report == listOption[2]) {
            setDataReport(divergetValueFiltered)
            setShowTable(true)
        }

          if (report == listOption[3]) {
            setDataReport(equipmentDivergetFiltered)
            setShowTable(true)
        }
    }

    
    const generation = async (e) => {
        e.preventDefault()
        sessionStorage.setItem('equipments', JSON.stringify(dataReport))
        if (report == listOption[0]) {
            if (dataReport.length <= 0) {
                return alert('Não existe dados para gerar relatório')
            }
            window.open('/reportComparative/comparativeEquipment')
        } else if (report == listOption[1]) {
            sessionStorage.setItem('comparativeValue', JSON.stringify(comparativeValueFiltered))
            if (comparativeValueFiltered.length <= 0) {
                return alert('Não existe valores iguais para gerar relatório')
            }
            window.open('/reportComparative/comparativeValue')
        } else if (report == listOption[2]) {
            sessionStorage.setItem('divergetValue', JSON.stringify(divergetValueFiltered))
            if (divergetValueFiltered.length <= 0) {
                return alert('Não existe valores divergente para gerar relatório')
            }
            window.open('/reportComparative/divergentValue')
        } else if (report == listOption[3]) {
            sessionStorage.setItem('divergentEquipment', JSON.stringify(equipmentDivergetFiltered))
            if (equipmentDivergetFiltered.length <= 0) {
                return alert('Não existe equipamentos divergentes para gerar relatório')
            }
            window.open('/reportComparative/divergentEquipment')
        }
    }

    return (
        <div className=" bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">   
            <div className="flex justify-between mb-8 lg:px-8 sm:px-8 w-full ">
                <div className="mt-8">
                    <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={generation}>Gerar Relatório</button>
                </div>
                {period.length > 0 && (
                    <div className="flex flex-col bg-indigo-400 text-white p-5 rounded-lg">
                {period.map(i => (
                    <div  key={i.idEquipmentRental} >{`Última importação Filial ${i['Branch'].branch}: ${new Date(i.initPeriod).toLocaleDateString('pt-br', {timeZone: 'UTC'})} à ${new Date(i.finishPeriod).toLocaleDateString('pt-br', {timeZone: 'UTC'})} `}</div>    
                    ))}
            </div>
                )}
            </div>
            <form className="ml-8 flex relative">
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Relatório'} name={'report'} datas={listOption} value={report} onchange={changeReport}></InputSelect>
                <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Data inicial'} type={'date'} name={'initPeriod'} value={initPeriod} onchange={changeInitPeriod}></InputForm>
                <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Data final'} type={'date'} name={'finshPeriod'} value={finishPeriod} onchange={changeFinishPeriod}></InputForm>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Filial'} name={'branch'} datas={listBranch} value={branchSelected} onchange={changeBranch}></InputSelect>
                <div className="relative mt-9 ">
                     <input className="mr-2" type="checkbox" checked={isCheked} onChange={handleCheckboxChange}></input>
                    <label>Buscar por Matriz</label>
                </div>
                <div className="mt-2 ml-4">
                    <button onClick={search} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Buscar</button>
                </div>
            </form>
            {showTable && (
                <div className="ml-8 flex-1 h-[65%] overflow-x-auto">
                    <Table Table={'table-auto bg-white shadow-md rounded-lg w-full'} TrThead={'bg-gray-800 text-white sticky top-0 z-10 text-nowrap rounded-lg'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4 text-black text-nowrap'} headers={['Código', 'Equipamento', 'Valor K&M', 'Valor', 'Filial', 'Entrada K&M', 'Entrada', 'Retorno K&M', 'Retorno', 'Usuário', 'Setor']} data={dataReport} attributos={['codProd', 'equipment', 'valueKm', 'value', 'branch', 'entryDateKm', 'entryDate', 'returnDateKm', 'returnDate', 'user', 'sector']} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'#'} bt={'...'}></Table>
                </div>
            )}
        </div>

    )

}