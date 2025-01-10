'use client'
import { useState } from "react"
import InputForm from "../../../../../components/InputForm"
import InputSelect from "../../../../../components/InputSelect"
import Modal from "../../../../../components/modal"
import updateData from "../../../../../utils/updateData"
import inactivateData from "../../../../../utils/inactivateData"


export default function UpdateEquipment({ dataEquipment, dataUser, dataFilial, dataSector, dataSupplier, token, idEquipment }) {

    const valueFilial = []
    const valueUsername = []
    const valueSector = []
    const valueSupplier = []


    dataFilial.map(value => {
        return valueFilial.push(value.filial)
    })

    dataUser.map(value => {
        return valueUsername.push(value.username)
    })

    dataSector.map(value => {
        return valueSector.push(value.sector)
    })

    dataSupplier.map(value => {
        return valueSupplier.push(value.supplier)
    })

    const [codProd, setCodProd] = useState(dataEquipment.codProd)
    const [equipment, setEquipment] = useState(dataEquipment.equipment)
    const [type, setType] = useState(dataEquipment.type)
    const [value, setValue] = useState(dataEquipment.value)
    const [filial, setFilial] = useState(dataEquipment['Filial'].filial)
    const [username, setUsername] = useState(dataEquipment['User'].username)
    const [sector, setSector] = useState(dataEquipment['Sector'].sector)
    const [supplier, setSupplier] = useState(dataEquipment['Supplier'].supplier)
    const [entryDate, setEntryDate] = useState(new Date(dataEquipment.entryDate).toLocaleDateString('pt-br').split('/').reverse().join('-'))
    const [returnDate, setReturnDate] = useState('')
    const [result, setResult] = useState('')

    const changeCodProd = (e) => {
        const newValue = e.target.value

        if (newValue === '' || newValue.length <= 10) {
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

    const changeFilial = (e) => {
        setFilial(e.target.value)
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

    const updateEquipment = async () => {

        const idUsername = []
        const idSector = []
        const idFilial = []
        const idSupplier = []

        dataUser.map(value => {
            if (value.username == username) {
                return idUsername.push(value.idUser)
            }
        })

        dataSector.map(value => {
            if (value.sector == sector) {
                return idSector.push(value.idSector)
            }
        })

        dataFilial.map(value => {
            if (value.filial == filial) {
                return idFilial.push(value.idFilial)
            }
        })

        dataSupplier.map(value => {
            if (value.supplier == supplier) {
                return idSupplier.push(value.idSupplier)
            }
        })

        const data = {
            idEquipment: 0,
            codProd: codProd,
            equipment: equipment,
            type: type,
            value: value,
            idFilial: idFilial[0],
            idUser: idUsername[0],
            idSector: idSector[0],
            idSupplier: idSupplier[0],
        }
        await updateData(`http://localhost:3001/updateEquipment/${idEquipment}`, data, token, setResult)
    }

    const returnEquipment = async () => {
        let data = {
            returnDate: returnDate
        }
        await inactivateData(`http://localhost:3001/returnEquipment/${idEquipment}`, data, token, setResult)

    }

    return (
        <section className="bg-gray-100 py-3">
            <Modal classFirstDivButton={'flex items-start mb-8 lg:px-2 sm:px-0'} classFirstButton={"p-2 bg-indigo-500 rounded-lg text-white"} FirstButton={'Devolver'} classCloseModal={'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'} classDivChildren={'bg-white rounded-lg shadow-lg w-96 p-6'} classDivButton={'flex justify-end mt-6'} classSecondButton={'px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300'} secondButton={'Fechar'} Children={
                <div>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Data Devolução'} type={'date'} name={'returnDate'} value={returnDate} onchange={changeReturnDate}></InputForm>
                    <button onClick={returnEquipment} className="p-2 bg-indigo-500 rounded-lg text-white">Devolver</button>
                </div>
            }></Modal>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Equipamento</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Código'} type={'number'} name={'codProd'} value={codProd} onchange={changeCodProd} maxLength={'10'}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Equipamento'} type={'text'} name={'equipment'} value={equipment} onchange={changeEquipment}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Tipo'} type={'text'} name={'type'} value={type} onchange={changeType}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Valor'} type={'decimal'} name={'value'} value={value} onchange={changeValue} maxLength={'10'}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Data Entrada'} type={'date'} name={'entryDate'} value={entryDate} onchange={changeEntryDate} maxLength={'10'}></InputForm>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Filial'} name={'filial'} datas={valueFilial} value={filial} onchange={changeFilial}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Usuário'} name={'username'} datas={valueUsername} value={username} onchange={changeUsername}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Setor'} name={'sector'} datas={valueSector} value={sector} onchange={changeSector}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Fonercedor'} name={'supplier'} datas={valueSupplier} value={supplier} onchange={changeSupplier}></InputSelect>
                </form>
                <div className="mb-6">
                    <button onClick={updateEquipment} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Adicionar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}