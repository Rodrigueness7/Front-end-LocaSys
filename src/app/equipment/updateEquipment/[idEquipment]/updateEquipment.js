'use client'
import { useState } from "react"
import InputForm from "../../../../components/InputForm"
import InputSelect from "../../../../components/InputSelect"
import Modal from "../../../../components/modal"
import updateData from "../../../../utils/updateData"
import inactivateData from "../../../../utils/inactivateData"
import addData from "../../../../utils/addData"
import { useRouter } from "next/navigation"
import MessageModal from "@/components/messageModal"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import SortItem from "@/utils/sortItem"


export default function UpdateEquipment({ dataEquipment, dataUser, dataBranch, dataSector, dataSupplier, token, idEquipment, dataTypeEquipment, dataAllEquipment, numberValue }) {

    const router = useRouter()
    const listBranch = SortItem(dataBranch, 'branch').map(item => item.branch)
    const listUsername = SortItem(dataUser, 'username').map(item => item.username)
    const listSector = SortItem(dataSector, 'sector').map(item => item.sector)
    const listSupplier = SortItem(dataSupplier, 'supplier').map(item => item.supplier)
    const listTypeEquipment = SortItem(dataTypeEquipment, 'typeEquipment').map(item => item.typeEquipment)

    
    const [codProd, setCodProd] = useState(dataEquipment.codProd == null ? '' : dataEquipment.codProd)
    const [equipment, setEquipment] = useState(dataEquipment.equipment)
    const [type, setType] = useState(dataEquipment['TypeEquipment'].typeEquipment)
    const [value, setValue] = useState(dataEquipment.value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}))
    const [branch, setBranch] = useState(dataEquipment['Branch'].branch)
    const [username, setUsername] = useState(dataEquipment['User'] == null ? '' : dataEquipment['User'].username)
    const [sector, setSector] = useState(dataEquipment['Sector'] == null ? '' : dataEquipment['Sector'].sector)
    const [supplier, setSupplier] = useState(dataEquipment['Supplier'].supplier)
    const [entryDate, setEntryDate] = useState(new Date(dataEquipment.entryDate).toISOString().split('T')[0])
    const [returnDate, setReturnDate] = useState('')
    const [reason, setReason] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [result, setResult] = useState('')
    const [checked, setChecked] = useState(dataEquipment['Situation'].idSituation == 2 ? true : false)
    const [replaceEquipment, setReplaceEquipment] = useState('')
   

    const changeCodProd = (e) => {
        if(e.target.value == "") {
            setCodProd(e.target.value)
        }
    }
        

    const changeEquipment = (e) => {
        setEquipment(e.target.value)
    }

    const changeType = (e) => {
        setType(e.target.value)
    }

    const changeValue = (e) => {
        const newValue = e.target.value

        if (newValue === '' || newValue.length <= 13) {
            const part = newValue.split(',')
            if(part.length > 2) return ;
        }

        setValue(newValue)
    }

   const pointLockValue  = (e) => {
        const regex = /[a-zA-Z]/
        const allowedKeys = ['Backspace', 'Delete', 'ArrowRigth', 'arrowLeft','Tab', 'Home', 'End']

        if(allowedKeys.includes(e.key)) {
            return;
        }

         if(e.key === "." || regex.test(e.key) ) {
            e.preventDefault();
        }
        
    }
    
    const changeBranch = (e) => {
        setBranch(e.target.value)
    }

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changeSector = (e) => {
        
        setSector(e.target.value)

    }

    const changeSupplier = (e) => {
        setSupplier(e.target.value)
    }

    const changeEntryDate = (e) => {
        setEntryDate(e.target.value)
    }

    const changeReturnDate = (e) => {
        setReturnDate(e.target.value)
    }

     const handleEquipmentInactive = (e) => {
        const { checked } = e.target  
        setChecked(checked)
    }  

    const handleEquipmentDisabled = () => {
        if(checked || dataEquipment.returnDate !== null) { 
            return true
        }
        return false

    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            router.push('../')
        }
    }

    const changeReason = (e) => {
        let reasonLength = e.target.value
        if (reasonLength.length <= 250) {
            setReason(reasonLength)
        }
    }

    const controlRequired = () => {
        if(username !== '' || sector !== '') {
            return true
        } 
        return false
        
    }

    const handleReplace = (e) => {
        setReplaceEquipment(e.target.value)
    }


    const updateEquipment = async (e) => {
        e.preventDefault()
        const idUser = username === '' ? null : dataUser.find(item => item.username === username).idUser
        const idSector = sector === '' ? null : dataSector.find(item => item.sector === sector).idSector
        const idBranch = dataBranch.find(item => item.branch === branch).idBranch
        const idSupplier = dataSupplier.find(item => item.supplier === supplier).idSupplier
        const idTypeEquipment = dataTypeEquipment.find(item => item.typeEquipment === type).idTypeEquipment

       const idSituation = () => {
            if(checked) {
                return 2
            } else if(username !== '' && sector !== '') {
                return 1
            } else if(username == '' && sector == '') {
                return 4
            }
       }

        const data = {
            idEquipment: 0,
            codProd: codProd,
            equipment: equipment,
            idTypeEquipment: idTypeEquipment,
            value: parseFloat(value.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(/,/g, '.')),
            idBranch: idBranch,
            idUser: checked ? null : idUser,
            idSector: checked ? null: idSector,
            idSupplier: idSupplier,
            entryDate: entryDate,
            entryDate: entryDate,
            idSituation: idSituation()
            
        }

        await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateEquipment/${idEquipment}`, data, token, setResult)
        setIsModalOpen(true)

        let existEquipment = dataAllEquipment.find(item => item.codProd == codProd)
        
        if(existEquipment == undefined || codProd) {
            let dataEquipmentHistory = {
            idEquipmentHistory: 0,
            idEquipment: idEquipment,
            reason: null,
            idUser: checked ? null : idUser,
            idSector: checked ? null : idSector,
            idBranch: idBranch,
            value: parseFloat(value.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(/,/g, '.')),
            entryDate: entryDate,
            returnDate: null,

        }
       
        await addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addEquipmentHistory`, dataEquipmentHistory, token, setResult)
        setIsModalOpen(true)
        }
    }

    const returnEquipment = async () => {
        const idUser = username === '' ? null : dataUser.find(item => item.username === username).idUser
        const idSector = sector === '' ? null : dataSector.find(item => item.sector === sector).idSector
        const idBranch = dataBranch.find(item => item.branch === branch).idBranch
     
        const data = {
            returnDate: returnDate,
            idSituation: 5
        }

        await inactivateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/returnEquipment/${idEquipment}`, data, token, setResult)
        setIsModalOpen(true)


        let dataEquipmentHistory = {
            idEquipmentHistory: 0,
            idEquipment: idEquipment,
            reason: reason,
            idUser: idUser,
            idSector: idSector,
            idBranch: idBranch,
            value: parseFloat(value.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(/,/g, '.')),
            entryDate: entryDate,
            returnDate: returnDate
        }

        await addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addEquipmentHistory`, dataEquipmentHistory, token, setResult)
        setIsModalOpen(true)


    }

    const reactivate = async () => {
        const idUser = username === '' ? null : dataUser.find(item => item.username === username).idUser
        const idSector = sector === '' ? null : dataSector.find(item => item.sector === sector).idSector
        const idBranch = dataBranch.find(item => item.branch === branch).idBranch
     

        let dataEquipment = {
            returnDate: null,
            entryDate: entryDate,
            idSituation: 4
        }
        
         await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/reactivateEquipment/${idEquipment}`, dataEquipment, token, setResult)
         setIsModalOpen(true)  


        let dataEquipmentHistory = {
            idEquipmentHistory: 0,
            idEquipment: idEquipment,
            reason: 'Equipamento Reativado',
            idUser: idUser,
            idSector: idSector,
            idBranch: idBranch,
            value: parseFloat(value.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(/,/g, '.')),
            entryDate: entryDate,
            returnDate: null
        }
       
        await addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addEquipmentHistory`, dataEquipmentHistory, token, setResult)
        setIsModalOpen(true)

          
    }

    const removerEquipment = async (e) => {
        e.preventDefault()

        let data = {
            deletedAt : new Date().toISOString()
        }

        await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/deleteEquipment/${idEquipment}`, data, token, setResult)
        setIsModalOpen(true)
    }

    const replace = () => {
        const idUser = username === '' ? null : dataUser.find(item => item.username === username).idUser
        const idSector = sector === '' ? null : dataSector.find(item => item.sector === sector).idSector
       
        const findEquipment = dataAllEquipment.find(item => item.codProd == replaceEquipment) === undefined ? null : dataAllEquipment.find(item => item.codProd == replaceEquipment)

        if(findEquipment == null) {
            setResult({error: 'Equipamento não encontrado'})
            setIsModalOpen(true)
            return;
        }

        if(findEquipment.codProd == dataEquipment.codProd) {
            setResult({error: 'Não é possível substituir pelo mesmo equipamento'})
            setIsModalOpen(true)
            return;
        }   

        

        const data = [{
            idEquipment: findEquipment.idEquipment,
            codProd: findEquipment.codProd,
            equipment: findEquipment.equipment,
            idTypeEquipment: findEquipment['TypeEquipment'].idTypeEquipment,
            value: findEquipment.value,
            idBranch: findEquipment['Branch'].idBranch,
            idUser: idUser,
            idSector: idSector,
            idSupplier: findEquipment['Supplier'].idSupplier,
            entryDate: findEquipment.entryDate,
            idSituation: dataEquipment['Situation'].idSituation
        },
        {
            idEquipment: dataEquipment.idEquipment,
            codProd: dataEquipment.codProd,
            equipment: dataEquipment.equipment,
            idTypeEquipment: dataEquipment['TypeEquipment'].idTypeEquipment,
            value: dataEquipment.value,
            idBranch: dataEquipment['Branch'].idBranch,
            idUser: findEquipment['User'] == null ? null : dataEquipment['User'].idUser,
            idSector: findEquipment['Sector'] == null ? null : dataEquipment['Sector'].idSector,
            idSupplier: dataEquipment['Supplier'].idSupplier,
            entryDate: dataEquipment.entryDate,
            idSituation: findEquipment['Situation'].idSituation
        }]

        const dataEquipmentHistory = [{
            idEquipmentHistory: 0,
            idEquipment: findEquipment.idEquipment, 
            reason: null,
            idUser: idUser,
            idSector: idSector,
            idBranch: findEquipment['Branch'].idBranch,
            value: findEquipment.value,
            entryDate: findEquipment.entryDate,
            returnDate: findEquipment.returnDate
        },
        {   idEquipmentHistory: 0,
            idEquipment: dataEquipment.idEquipment, 
            reason: null,
            idUser: findEquipment['User'] == null ? null : dataEquipment['User'].idUser,
            idSector: findEquipment['Sector'] == null ? null : dataEquipment['Sector'].idSector,
            idBranch: dataEquipment['Branch'].idBranch,
            value: dataEquipment.value,
            entryDate: dataEquipment.entryDate,
            returnDate: dataEquipment.returnDate
        }]

        

            data.map(async (item) => {
                await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateEquipment/${item.idEquipment}`, item, token, setResult)
            })
            
            dataEquipmentHistory.map(async (item) => {  
                    await addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addEquipmentHistory`, item, token, setResult)
            })
                setIsModalOpen(true)
    }

    return (
        <section className="bg-gray-100 py-3 w-full">
            <div className="flex justify-between">
              <div className = 'flex flex-col h-0'>
                 {dataEquipment.returnDate == null ? (
                 <Modal classFirstDivButton={'flex items-start mb-8 lg:px-2 sm:px-0'} classFirstButton={"p-2 bg-indigo-500 rounded-lg text-white"} FirstButton={'Devolver'} classCloseModal={'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'} classDivChildren={'bg-white rounded-lg shadow-lg w-96 p-6'} classDivButton={'flex justify-end mt-6'} classSecondButton={'px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300'} secondButton={'Fechar'} Children={
                    <div>
                        <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Data Devolução'} type={'date'} name={'returnDate'} value={returnDate} onchange={changeReturnDate}></InputForm>
                        <form>
                            <label className="block text-sm font-medium text-gray-700" htmlFor='mensage'>Motivo</label>
                            <textarea className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black" name="reason" rows={'4'} cols={'60'} value={reason} onChange={changeReason}></textarea>
                        </form>
                        <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                            result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                                <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                            )
                        }></MessageModal>
                        <button onClick={returnEquipment} className="p-2 mt-4 bg-indigo-500 rounded-lg text-white">Devolver</button>
                    </div>
                }></Modal>) : null}
                 <Modal classFirstDivButton={'flex items-start mb-8 lg:px-2 sm:px-0'} classFirstButton={"p-2 bg-indigo-500 rounded-lg text-white"} FirstButton={'Substituir'} classCloseModal={'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'} classDivChildren={'bg-white rounded-lg shadow-lg w-96 p-6'} classDivButton={'flex justify-end mt-6'} classSecondButton={'px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300'} secondButton={'Fechar'} Children={
                    <div className="relative">
                        <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Equipamento Substituto'} type={'text'} name={'replaceEquipment'} value={replaceEquipment} onchange={handleReplace} disabled={false}></InputForm>
                        <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                            result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                                <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                            )
                        }></MessageModal>
                        <div className="absolute bottom-15">
                            <button onClick={replace} className="p-2 mt-4 bg-indigo-500 rounded-lg text-white w-24">Substituir</button>
                        </div>
                    </div>
                }></Modal>
              </div>
                {dataEquipment.returnDate !== null ? (
                    <Modal classFirstDivButton={'flex items-start mb-8 lg:px-2 sm:px-0'} classFirstButton={"p-2 bg-indigo-500 rounded-lg text-white"} FirstButton={'Reativar'} classCloseModal={'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'} classDivChildren={'bg-white rounded-lg shadow-lg w-96 p-6'} classDivButton={'flex justify-end mt-6'} classSecondButton={'px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300'} secondButton={'Fechar'} Children={
                    <div>
                        <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Data Reativação'} type={'date'} name={'entryDate'} value={entryDate} onchange={changeEntryDate}></InputForm>
                        <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                            result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                                <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                            )
                        }></MessageModal>
                        <button onClick={reactivate} className="p-2 mt-4 bg-indigo-500 rounded-lg text-white">Reativar</button>
                    </div>
                }></Modal>
                ): null}
                {dataEquipment.returnDate == null ? (
                    <Modal classFirstDivButton={'flex items-start mb-8 lg:px-2 sm:px-0'} classFirstButton={"p-2 bg-indigo-500 rounded-lg text-white"} FirstButton={'Deletar'} classCloseModal={'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'} classDivChildren={'bg-white rounded-lg shadow-lg w-96 p-6'} classDivButton={'flex justify-end mt-6'} classSecondButton={'px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300'} secondButton={'Não'} Children={
                    <div className="relative">
                        <div>Tem certeza que deseja deletar esse equipamento?</div>
                        <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                            result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                                <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                            )
                        }></MessageModal>
                        <div className="absolute bottom-15">
                            <button onClick={removerEquipment} className="p-2 mt-4 bg-indigo-500 rounded-lg text-white w-16">Sim</button>
                        </div>
                    </div>
                }></Modal>
                ): null}
               
            </div>
            
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Equipamento</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4" onSubmit={updateEquipment}>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-0'} label={'Código'} type={'text'} name={'codProd'} value={codProd} onchange={changeCodProd} disabled={true} maxLength={'10'}></InputForm>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" name="Equipamento sem Código" checked={checked} onChange={handleEquipmentInactive}></input>
                        <label className="ml-2 text-sm text-gray-700">Inativar Equipamento</label>
                    </div>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Equipamento'} type={'text'} name={'equipment'} value={equipment} onchange={changeEquipment} required={true} disabled={handleEquipmentDisabled()}></InputForm>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Tipo'} name={'typeEquipment'} datas={listTypeEquipment} value={type} onchange={changeType} disabled={handleEquipmentDisabled()}></InputSelect>
                    {numberValue !== undefined ? (
                        <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Valor'} type={'decimal'} name={'value'} value={value} onchange={changeValue} maxLength={'10'} onKeyDown={pointLockValue} required={controlRequired()} disabled={handleEquipmentDisabled()}></InputForm>
                    ) : null}
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Data Entrada'} type={'date'} name={'entryDate'} value={entryDate} onchange={changeEntryDate} maxLength={'10'} disabled={handleEquipmentDisabled()}></InputForm>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Filial'} name={'branch'} datas={listBranch} value={branch} onchange={changeBranch} disabled={handleEquipmentDisabled()}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Usuário'} name={'username'} datas={listUsername} value={username} onchange={changeUsername} disabled={handleEquipmentDisabled()} required={controlRequired()}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Setor'} name={'sector'} datas={listSector} value={sector} onchange={changeSector} disabled={handleEquipmentDisabled()} required={controlRequired()}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Fonercedor'} name={'supplier'} datas={listSupplier} value={supplier} onchange={changeSupplier} disabled={handleEquipmentDisabled()}></InputSelect>
                    <div className="mb-6">
                        <button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Atualizar</button>
                    </div>
                </form>
                <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                    result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                        <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                    )
                }></MessageModal>

            </div>
        </section>
    )
}