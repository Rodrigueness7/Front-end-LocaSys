'use client'
import { useState } from "react"
import InputForm from "../../../components/InputForm"
import InputSelect from "../../../components/InputSelect"
import addData from "../../../utils/addData"
import fetchData from "../../../utils/fetchData"
import MessageModal from "@/components/messageModal"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { useRouter } from "next/navigation"


export default function PageRegisterEquipment({ dataUser, dataBranch, dataSector, dataSupplier, token }) {

    const listBranch = dataBranch.map(item => item.branch)
    const listUsername = dataUser.map(item => item.username)
    const listSector = dataSector.map(item => item.sector)
    const listSupplier = dataSupplier.map(item => item.supplier)

    const router = useRouter()
    const [codProd, setCodProd] = useState('')
    const [equipment, setEquipment] = useState('')
    const [type, setType] = useState('')
    const [value, setValue] = useState('')
    const [branch, setBranch] = useState(listBranch[0])
    const [username, setUsername] = useState(listUsername[0])
    const [sector, setSector] = useState(listSector[0])
    const [supplier, setSupplier] = useState(listSupplier[0])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [result, setResult] = useState('')

    const changeCodProd = (e) => {
        const newValue = e.target.value
        if (/^[0-9]*$/.test(newValue) && newValue.length <= 10) {
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

    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            router.push('./')
        }
    }

    const addEquipment = async () => {

        const idUsername = dataUser.find(item => item.username === username).idUser
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
            idUser: idUsername,
            idSector: idSector,
            idSupplier: idSupplier,
            entryDate: new Date().toLocaleString('pt-BR').slice(0, 10)
        }

        await addData('http://localhost:3001/addEquipment', data, token, setResult)
        setIsModalOpen(true)
        

        setTimeout(async () => {
            let fetchEquipment = await fetchData('http://localhost:3001/findAllEquipment', token)
            let fetchIdEquipment = fetchEquipment.find(item => item.codProd == codProd)

            let dataEquipmentHistory = {
                idEquipmentHistory: 0,
                idEquipment: fetchIdEquipment,
                reason: null,
                entryDate: new Date().toLocaleString('pt-BR').slice(0, 10),
                returnDate: null
            }
            addData('http://localhost:3001/addEquipmentHistory', dataEquipmentHistory, token, setResult) 
        }, 2000)

    }

    return (
        <section className="bg-gray-100 py-3">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Adicionar Equipamento</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Código'} type={'text'} name={'codProd'} value={codProd} onchange={changeCodProd} maxLength={'10'}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Equipamento'} type={'text'} name={'equipment'} value={equipment} onchange={changeEquipment}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Tipo'} type={'text'} name={'type'} value={type} onchange={changeType}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Valor'} type={'decimal'} name={'value'} value={value} onchange={changeValue} maxLength={'10'}></InputForm>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Filial'} name={'branch'} datas={listBranch} value={branch} onchange={changeBranch}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Usuário'} name={'username'} datas={listUsername} value={username} onchange={changeUsername}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Setor'} name={'sector'} datas={listSector} value={sector} onchange={changeSector}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Fonercedor'} name={'supplier'} datas={listSupplier} value={supplier} onchange={changeSupplier}></InputSelect>
                </form>
                <div className="mb-6">
                    <button onClick={addEquipment} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Adicionar</button>
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


