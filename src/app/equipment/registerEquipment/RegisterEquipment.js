'use client'
import { useState } from "react"
import InputForm from "../../../components/InputForm"
import InputSelect from "../../../components/InputSelect"
import addData from "../../../utils/addData"
import fetchData from "../../../utils/fetchData"


export default function PageRegisterEquipment({ dataUser, dataFilial, dataSector, dataSupplier, token }) {

    const valueFilial = []
    const valueUsername = []
    const valueSector = []
    const valueSupplier = []

    dataFilial.map(value => {
        return valueFilial.push(value.branch)
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

    const [codProd, setCodProd] = useState('')
    const [equipment, setEquipment] = useState('')
    const [type, setType] = useState('')
    const [value, setValue] = useState('')
    const [filial, setFilial] = useState(valueFilial[0])
    const [username, setUsername] = useState(valueUsername[0])
    const [sector, setSector] = useState(valueSector[0])
    const [supplier, setSupplier] = useState(valueSupplier[0])
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

    const addEquipment = async () => {

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
            if (value.branch == filial) {
                return idFilial.push(value.idBranch)
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
            idBranch: idFilial[0],
            idUser: idUsername[0],
            idSector: idSector[0],
            idSupplier: idSupplier[0],
            entryDate: new Date().toLocaleString('pt-BR').slice(0, 10)
        }
        await addData('http://localhost:3001/addEquipment', data, token, setResult)

       

        setTimeout(async () => {
            let fetchEquipment = await fetchData('http://localhost:3001/findAllEquipment', token)
            let fetchIdEquipment = fetchEquipment.find(item => item.codProd == codProd).idEquipment

            let dataEquipmentHistory = {
                idEquipmentHistory: 0,
                idEquipment: fetchIdEquipment,
                reason: null,
                entryDate: new Date().toLocaleString('pt-BR').slice(0, 10),
                returnDate: null
            }
            addData('http://localhost:3001/addEquipmentHistory', dataEquipmentHistory, token, setResult)
            
        },2000)

    }

    return (
        <section className="bg-gray-100 py-3">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Adicionar Equipamento</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Código'} type={'number'} name={'codProd'} value={codProd} onchange={changeCodProd} maxLength={'10'}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Equipamento'} type={'text'} name={'equipment'} value={equipment} onchange={changeEquipment}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Tipo'} type={'text'} name={'type'} value={type} onchange={changeType}></InputForm>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Valor'} type={'decimal'} name={'value'} value={value} onchange={changeValue} maxLength={'10'}></InputForm>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Filial'} name={'filial'} datas={valueFilial} value={filial} onchange={changeFilial}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Usuário'} name={'username'} datas={valueUsername} value={username} onchange={changeUsername}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Setor'} name={'sector'} datas={valueSector} value={sector} onchange={changeSector}></InputSelect>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Fonercedor'} name={'supplier'} datas={valueSupplier} value={supplier} onchange={changeSupplier}></InputSelect>
                </form>
                <div className="mb-6">
                    <button onClick={addEquipment} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Adicionar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}


