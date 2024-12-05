'use client'
import { useState } from "react"
import InputForm from "../../../../components/InputForm"

export default function PageRegisterEquipment({dataUser, dataFilial, dataSector, dataSupplier}) {

    const [codProd, setCodProd] = useState('')

    const changeCodProd = (e) => {
        setCodProd(e.target.value)
    }

    return (
       <section className="bg-gray-100 py-3">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Adicionar Equipamento</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'}  label={'Código'} type={'number'} name={'codProd'} value={codProd} onchange={changeCodProd}></InputForm>
            </form>
            </div>
       </section>
    )
}


