'use client'
import { useEffect, useState } from "react"
import InputForm from "../../../../components/InputForm"
import InputSelect from "../../../../components/InputSelect"
import Modal from "../../../../components/modal"
import updateData from "../../../../utils/updateData"
import inactivateData from "../../../../utils/inactivateData"
import addData from "../../../../utils/addData"
import { useRouter } from "next/navigation"
import MessageModal from "@/components/messageModal"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"


export default function UpdateEquipment({ dataEquipment, dataUser, dataBranch, dataSector, dataSupplier, token, idEquipment }) {

    const router = useRouter()
    const listBranch = dataBranch.map(item => item.branch)
    const listUsername = dataUser.map(item => item.username)
    const listSector = dataSector.map(item => item.sector)
    const listSupplier = dataSupplier.map(item => item.supplier)


    const [codProd, setCodProd] = useState(dataEquipment.codProd)
    const [equipment, setEquipment] = useState(dataEquipment.equipment)
    const [type, setType] = useState(dataEquipment.type)
    const [value, setValue] = useState(dataEquipment.value)
    const [branch, setBranch] = useState(dataEquipment['Branch'].branch)
    const [username, setUsername] = useState(dataEquipment['User'].username)
    const [sector, setSector] = useState(dataEquipment['Sector'].sector)
    const [supplier, setSupplier] = useState(dataEquipment['Supplier'].supplier)
    const [entryDate, setEntryDate] = useState(new Date(dataEquipment.entryDate).toISOString().split('T')[0])
    const [returnDate, setReturnDate] = useState('')
    const [reason, setReason] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [result, setResult] = useState('')
   

    const changeCodProd = (e) => {
        const newValue = e.target.value
        if (/^[0-9]*$/.test(newValue) && newValue.length <= 20) {
            setCodProd(newValue)
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
            setValue(newValue)
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


    const updateEquipment = async () => {

        const idUser = dataUser.find(item => item.username === username).idUser
        const idSector = dataSector.find(item => item.sector === sector).idSector
        const idBranch = dataBranch.find(item => item.branch === branch).idBranch
        const idSupplier = dataSupplier.find(item => item.supplier === supplier).idSupplier

        const data = {
            idEquipment: 0,
            codProd: codProd,
            equipment: equipment,
            type: type,
            value: value,
            idBranch: idBranch,
            idUser: idUser,
            idSector: idSector,
            idSupplier: idSupplier,
            entryDate: entryDate
        }
        await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateEquipment/${idEquipment}`, data, token, setResult)
        setIsModalOpen(true)


        let dataEquipmentHistory = {
            idEquipmentHistory: 0,
            idEquipment: idEquipment,
            reason: null,
            idUser: idUser,
            idSector: idSector,
            idBranch: idBranch,
            value: value,
            entryDate: entryDate,
            returnDate: null,
            entryDate: entryDate
        }

        await addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addEquipmentHistory`, dataEquipmentHistory, token, setResult)
        setIsModalOpen(true)

    }

    const returnEquipment = async () => {
        const idUser = dataUser.find(item => item.username === username).idUser
        const idSector = dataSector.find(item => item.sector === sector).idSector
        const idBranch = dataBranch.find(item => item.branch === branch).idBranch
        const idSupplier = dataSupplier.find(item => item.supplier === supplier).idSupplier


        const data = {
            idEquipment: 0,
            codProd: codProd,
            equipment: equipment,
            type: type,
            value: value,
            idBranch: idBranch,
            idUser: idUser,
            idSector: idSector,
            idSupplier: idSupplier,
            returnDate: returnDate
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
            value: value,
            entryDate: entryDate,
            returnDate: returnDate
        }

        await addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addEquipmentHistory`, dataEquipmentHistory, token, setResult)
        setIsModalOpen(true)


    }

    const reactivate = async () => {
        const idUser = dataUser.find(item => item.username === username).idUser
        const idSector = dataSector.find(item => item.sector === sector).idSector
        const idBranch = dataBranch.find(item => item.branch === branch).idBranch
        const idSupplier = dataSupplier.find(item => item.supplier === supplier).idSupplier

        let data = {
            returnDate: null
        }
        await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/returnEquipment/${idEquipment}`, data, token, setResult)
        setIsModalOpen(true)


        let dataEquipmentHistory = {
            idEquipmentHistory: 0,
            idEquipment: idEquipment,
            reason: 'Equipamento Reativado',
            idUser: idUser,
            idSector: idSector,
            idBranch: idBranch,
            value: value,
            entryDate: entryDate,
            returnDate: null
        }

        await addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addEquipmentHistory`, dataEquipmentHistory, token, setResult)
        setIsModalOpen(true)

        let dataEquipment = {
            idEquipment: 0,
            codProd: codProd,
            equipment: equipment,
            type: type,
            value: value,
            idBranch: idBranch,
            idUser: idUser,
            idSector: idSector,
            idSupplier: idSupplier,
            returnDate: null,
            entryDate: entryDate
        }
        
         await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateEquipment/${idEquipment}`, dataEquipment, token, setResult)
         setIsModalOpen(true)

        
    }

    return (
        <section className="bg-gray-100 py-3 w-full">
            <div className="flex justify-between">
                <Modal classFirstDivButton={'flex items-start mb-8 lg:px-2 sm:px-0'} classFirstButton={"p-2 bg-indigo-500 rounded-lg text-white"} FirstButton={'Devolver'} classCloseModal={'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'} classDivChildren={'bg-white rounded-lg shadow-lg w-96 p-6'} classDivButton={'flex justify-end mt-6'} classSecondButton={'px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300'} secondButton={'Fechar'} Children={
                    <div>
                        <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Data Devolução'} type={'date'} name={'returnDate'} value={returnDate} onchange={changeReturnDate}></InputForm>
                        <form>
                            <label className="'block text-sm font-medium text-gray-700'" htmlFor='mensage'>Motivo</label>
                            <textarea className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" name="reason" rows={'4'} cols={'60'} value={reason} onChange={changeReason}></textarea>
                        </form>
                        <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                            result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                                <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                            )
                        }></MessageModal>
                        <button onClick={returnEquipment} className="p-2 mt-4 bg-indigo-500 rounded-lg text-white">Devolver</button>
                    </div>
                }></Modal>
                <Modal classFirstDivButton={'flex items-start mb-8 lg:px-2 sm:px-0'} classFirstButton={"p-2 bg-indigo-500 rounded-lg text-white"} FirstButton={'Reativar'} classCloseModal={'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'} classDivChildren={'bg-white rounded-lg shadow-lg w-96 p-6'} classDivButton={'flex justify-end mt-6'} classSecondButton={'px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300'} secondButton={'Fechar'} Children={
                    <div>
                        <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Data Reativação'} type={'date'} name={'entryDate'} value={entryDate} onchange={changeEntryDate}></InputForm>
                        <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                            result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                                <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                            )
                        }></MessageModal>
                        <button onClick={reactivate} className="p-2 mt-4 bg-indigo-500 rounded-lg text-white">Reativar</button>
                    </div>
                }></Modal>
            </div>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Equipamento</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Código'} type={'text'} name={'codProd'} value={codProd} onchange={changeCodProd} min={0} maxLength={'10'}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Equipamento'} type={'text'} name={'equipment'} value={equipment} onchange={changeEquipment}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Tipo'} type={'text'} name={'type'} value={type} onchange={changeType}></InputForm>
                    {value !== undefined ? (
                        <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Valor'} type={'decimal'} name={'value'} value={value} onchange={changeValue} maxLength={'10'}></InputForm>
                    ) : null}
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Data Entrada'} type={'date'} name={'entryDate'} value={entryDate} onchange={changeEntryDate} maxLength={'10'}></InputForm>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Filial'} name={'branch'} datas={listBranch} value={branch} onchange={changeBranch}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Usuário'} name={'username'} datas={listUsername} value={username} onchange={changeUsername}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Setor'} name={'sector'} datas={listSector} value={sector} onchange={changeSector}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Fonercedor'} name={'supplier'} datas={listSupplier} value={supplier} onchange={changeSupplier}></InputSelect>
                </form>
                <div className="mb-6">
                    <button onClick={updateEquipment} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Atualizar</button>
                </div>
                <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                    result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                        <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                    )
                }></MessageModal>

            </div>
        </section>
    )
}