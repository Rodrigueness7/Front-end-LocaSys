'use client'
import { useState } from "react"
import InputForm from "../../../../components/InputForm"
import updateData from "../../../../utils/updateData"
import inactivateData from "../../../../utils/inactivateData"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"



export default function UpdateBranch({dataBranch, idBranch, token }) {

    const [branch, setBranch] = useState(dataBranch.branch)
    const [CNPJ, setCNPJ] = useState((dataBranch.CNPJ == null)? "" : dataBranch.CNPJ )
    const [corporateName, setCoporateName] = useState((dataBranch.corporateName == null)? "": dataBranch.corporateName)
    const [uniqueIdentifier, setUniqueIdentifier] = useState(dataBranch.uniqueIdentifier)
    const [result, setResult] = useState('')

    const changeBranch = (e) => {
        let fieldBranch = e.target.value
        if (fieldBranch === '' || fieldBranch.length <= 25) {
            setBranch(fieldBranch)
        }
    }

    const changeCNPJ = (e) => {
        let fieldCNPJ = e.target.value
        if(fieldCNPJ === '' || fieldCNPJ.length <= 14) {
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
        setUniqueIdentifier(branch.uniqueIdentifier)

    }

    const updateBranch = async () => {
        const data = {
            branch: branch,
            CNPJ: CNPJ,
            corporateName: corporateName,
            uniqueIdentifier: uniqueIdentifier
        }

        await updateData(`http://localhost:3001/updateBranch/${idBranch}`, data, token, setResult, 'Atualizado com Sucesso')

    }

    const deleteBranch = async () => {

        let data = {
            deletionDate: new Date().toLocaleDateString('pt-BR')
        }

        await inactivateData(`http://localhost:3001/inactivateBranch/${idBranch}`, data, token, setResult, 'Deletado com sucesso')
        
    }

    return (
        <section className="bg-gray-100 py-3 h-screen">
            <div className="flex items-start mb-8 lg:px-2 sm:px-0">
                <button onClick={deleteBranch} className="p-2 bg-indigo-500 rounded-lg text-white">Deletar</button>
            </div>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar Filial</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Código Filial"} name={"uniqueIdentifier"} type={'number'} value={uniqueIdentifier} onchange={changeUniqueIdentifier}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Filial"} name={"branch"} type={'text'} value={branch} onchange={changeBranch}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"CNPJ"} name={"CNPJ"} type={'text'} value={CNPJ} onchange={changeCNPJ}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Razão Social"} name={"corporateName"} type={'text'} value={corporateName} onchange={changeCoporateName}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={updateBranch} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
                </div>
                <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error? result.error : result.sucess} icone={
                    result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full"/>) : (
                        <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full"/>
                    )
                }></MessageModal>
            </div>
        </section>
    )
}