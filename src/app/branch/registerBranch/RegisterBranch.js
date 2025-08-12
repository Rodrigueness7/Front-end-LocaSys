'use client'
import { useState } from "react";
import InputForm from "../../../components/InputForm";
import addData from "../../../utils/addData";
import MessageModal from "../../../components/messageModal";
import { FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa'
import { useRouter } from "next/navigation";


export default function PageRegisterBranch({ token }) {

    const [branch, setBranch] = useState('')
    const [CNPJ, setCNPJ] = useState('')
    const [corporateName, setCoporateName] = useState('')
    const [uniqueIdentifier, setUniqueIdentifier] = useState('')
    const [result, setResult] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    
    

    const changeBranch = (e) => {
        let fieldBranch = e.target.value
        if (fieldBranch === '' || fieldBranch.length <= 25) {
            setBranch(fieldBranch)
        }
    }

    const changeCNPJ = (e) => {
        let fieldCNPJ = e.target.value
        if (fieldCNPJ === '' || fieldCNPJ.length <= 14) {
            setCNPJ(fieldCNPJ)
        }
    }

    const changeCoporateName = (e) => {
        let fieldCoporateName = e.target.value
        if (fieldCoporateName === '' || fieldCoporateName.length <= 25) {
            setCoporateName(fieldCoporateName)
        }
    }

    const changeUniqueIdentifier = (e) => {
        let fieldUniqueIdentifier = e.target.value
        if (/^[0-9]*$/.test(fieldUniqueIdentifier) && fieldUniqueIdentifier.length <= 11) {
            setUniqueIdentifier(fieldUniqueIdentifier)
        }
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            router.push('./')
        }
    }

    const addBranch = async () => {
        const data = {
            branch: branch,
            CNPJ: CNPJ,
            corporateName: corporateName,
            uniqueIdentifier: uniqueIdentifier
        }

        await addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addBranch`, data, token, setResult)
        setIsModalOpen(true)

    }

    return (
        <section className="bg-gray-100 py-3 h-screen w-full">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Cadastro da Filial</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Código Filial"} name={"uniqueIdentifier"} type={'text'} value={uniqueIdentifier} onchange={changeUniqueIdentifier}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Filial"} name={"branch"} type={'text'} value={branch} onchange={changeBranch}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"CNPJ"} name={"CNPJ"} type={'text'} value={CNPJ} onchange={changeCNPJ}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Razão Social"} name={"corporateName"} type={'text'} value={corporateName} onchange={changeCoporateName}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={addBranch} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Cadastrar</button>
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