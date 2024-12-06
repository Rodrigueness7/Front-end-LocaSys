'use client'
import { useState } from "react"
import InputForm from "../../../../components/InputForm"
import InputSelect from "../../../../components/InputSelect"

export default function PageRegisterEquipment({dataUser, dataFilial, dataSector, dataSupplier}) {
    const valueUsers = []
    const valueFilial = []
    const valueSector = []
    const valueSupplier = []

    dataFilial.map(values => {
        valueFilial.push(values)
    })


    const [codProd, setCodProd] = useState('')
    const [equipment, setEquipment] = useState('')
    const [type, setType] = useState('')
    const [value, setValue] = useState('')
    

    const changeCodProd = (e) => {
        const newValue = e.target.value

        if(newValue === '' || newValue.length <=10) {
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

        if(newValue === '' || newValue.length <= 13) {
            setValue(newValue)
        }
    }

  
    return (
       <section className="bg-gray-100 py-3">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Adicionar Equipamento</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'}  label={'Código'} type={'number'} name={'codProd'} value={codProd} onchange={changeCodProd} maxLength={'10'}></InputForm>
                <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'}  label={'Equipamento'} type={'text'} name={'equipment'} value={equipment} onchange={changeEquipment}></InputForm>
                <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'}  label={'Tipo'} type={'text'} name={'type'} value={type} onchange={changeType}></InputForm>
                <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'}  label={'Value'} type={'decimal'} name={'value'} value={value} onchange={changeValue} maxLength={'10'}></InputForm>
               
            
            </form>
            </div>
       </section>
    )
}


