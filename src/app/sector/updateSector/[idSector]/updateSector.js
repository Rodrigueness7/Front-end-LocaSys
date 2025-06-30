'use client'

import { useState } from "react"
import InputSelect from "../../../../components/InputSelect"
import InputForm from "../../../../components/InputForm"
import updateData from "../../../../utils/updateData"
import inactivateData from "../../../../utils/inactivateData"
import { useRouter } from "next/navigation"
import MessageModal from "@/components/messageModal"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

export default function UpdateSector({ idSector, dataSector, dataBranch, token }) {

   
    const listBranch = dataBranch.map(item => item.branch)

    const router = useRouter()
    const [sector, setSector] = useState(dataSector.sector)
    const [branch, setBranch] = useState(dataSector['Branch'].branch)
    const [result, setResult] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const changeSector = (e) => {
        setSector(e.target.value)
    }

    const changeBranch = (e) => {
        setBranch(e.target.value)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            router.push('../')
        }
    }

    const updateSector = async () => {
        const idBranch = dataBranch.find(item => item.branch === branch).idBranch
        const uniqueIdentifier = dataBranch.find(item => item.branch === branch).uniqueIdentifier
        
        let data = {
            sector: sector,
            idBranch: idBranch,
            uniqueIdentifier: uniqueIdentifier
        }

        await updateData(`http://localhost:3001/updateSector/${idSector}`, data, token, setResult, 'Atualizado com sucesso')
        setIsModalOpen(true)
    }

    const deleteSector = async () => {
        let data = {
            deletionDate: new Date().toLocaleDateString('pt-BR')
        }

        await inactivateData(`http://localhost:3001/inactivateSector/${idSector}`, data, token, setResult, 'Deletado com sucesso')
        setIsModalOpen(true)
    }

    return (
        <section className="bg-gray-100 py-3 h-screen w-full">
            <div className="flex items-start mb-8 lg:px-2 sm:px-0">
                <button onClick={deleteSector} className="p-2 bg-indigo-500 rounded-lg text-white">Deletar</button>
            </div>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Setor</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Filial'} name={'branch'} datas={listBranch} value={branch} onchange={changeBranch}></InputSelect>
                    <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Setor'} type={'text'} name={'sector'} value={sector} onchange={changeSector}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={updateSector} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
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