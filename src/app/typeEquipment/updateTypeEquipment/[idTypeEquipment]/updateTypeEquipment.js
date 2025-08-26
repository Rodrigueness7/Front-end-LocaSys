'use client'
import InputForm from "@/components/InputForm";
import MessageModal from "@/components/messageModal";
import updateData from "@/utils/updateData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function UpdateTypeEquipment({dataTypeEquipment, idTypeEquipment, token}) {
    const router = useRouter()
    const [typeEquipment, setTypeEquipment] = useState(dataTypeEquipment.typeEquipment)
    const [result, setResult] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const changetypeEquipment = (e) => {
        const newTypeEquipment = e.target.value
        if(newTypeEquipment != ' ' || newTypeEquipment <= 30) {
            setTypeEquipment(newTypeEquipment)
        } 
    }

     const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            router.push('../')
        }
    }

    const updateTypeEquipment = async () => {

        const data = {
            typeEquipment: typeEquipment
        }

        await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateTypeEquipment/${idTypeEquipment}`, data, token, setResult)
        setIsModalOpen(true)
    }

    return (
        <section className="bg-gray-100 py-3 w-full">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg" >
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Tipo de Equipamento </h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"Tipo de Equipamento"} name={"typeEquipment"} type={'text'} value={typeEquipment} onchange={changetypeEquipment}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={updateTypeEquipment} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
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