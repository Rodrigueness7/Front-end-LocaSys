'use client'

import FormModal from "@/components/formModal";
import InputForm from "@/components/InputForm";
import InputSelect from "@/components/InputSelect";
import MessageModal from "@/components/messageModal";
import addData from "@/utils/addData";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";



export default function Menu({ token, dataBranch }) {


    const listBranch = dataBranch.map(item => item.branch)
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [file, setFile] = useState(null)
    const [result, setResult] = useState('')
    const [cellInit, setCellInit] = useState('')
    const [cellFinish, setCellFinish] = useState('')
    const [initPeriod, setInitPeriod] = useState('')
    const [finishPeriod, setFinishPeriod] = useState('')
    const [branch, setBranch] = useState(listBranch[0])
    const [showImport, setShowImport] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showReport, setShowReport] = useState(false)
    

    console.log(dataBranch)

    const changeCellInit = (e) => {
        setCellInit(e.target.value)
    }

    const changeCellFinish = (e) => {
        setCellFinish(e.target.value)
    }

    const changeInitPeriod = (e) => {
        setInitPeriod(e.target.value)
    }

    const changeFinishPeriod = (e) => {
        setFinishPeriod(e.target.value)
    }

    const changeBranch = (e) => {
        setBranch(e.target.value)
    }


    const handleExit = () => {
        const clearCookie = (name) => {
            document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        };

        clearCookie('token');
        localStorage.clear()
        router.push('./login')
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(file);

    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            router.push('./')
        }
    }

    const handleShow = (e) => {
        e.preventDefault()

        if (show == false) {
            setShow(true)
        } else {
            setShow(false)
        }

    }

    const handleReport = (e) => {
        e.preventDefault()

        if (showReport == false) {
            setShowReport(true)
        } else {
            setShowReport(false)
        }
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);


        await fetch('http://localhost:3001/uploadFile', {
            method: 'POST',
            headers: {
                'Authorization': token
            },
            body: formData
        })

        const idBranch = dataBranch.find(item => item.branch === branch).idBranch

        const data = {
            cell1: cellInit,
            cell2: cellFinish,
            initPeriod: initPeriod,
            finishPeriod: finishPeriod,
            idBranch: idBranch
        }

        await addData('http://localhost:3001/addEquipmentRental', data, token, setResult)
        setCellInit('')
        setCellFinish('')
        setInitPeriod('')
        setFinishPeriod('')
        setIsModalOpen(true)
       
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const idBranch = dataBranch.find(item => item.branch === branch).idBranch
        
        const data = {
            initPeriod: initPeriod,
            finishPeriod: finishPeriod,
            idBranch: idBranch
        }

        await fetch('http://localhost:3001/deleteAllEquipmentRental', {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }, 
        body: JSON.stringify(data)
    }).then(
        result => result.json()
    ).then(
        res => {
            if (res.successMessage) {
                setResult({ success: res.successMessage })
            } else {
                setResult({ error: res.errorMessage })
            }
        }
    )
    setInitPeriod('')
    setFinishPeriod('')
    setIsModalOpen(true)

    }

    return (
        <div className="flex">
            <div className={`bg-slate-800 text-white w-64 h-screen p-8 space-y-4 md:block`}>
                <h1 className="font-bold text-2xl">Locasys</h1>
                <div >
                    <Link href={'/users'} className="hover:text-blue-500 transition duration-300">Usuário</Link>
                </div>
                <div>
                    <Link href={'/equipment'} className="hover:text-blue-500 transition duration-300">Equipamento</Link>
                </div>
                <div>
                    <Link href={'/branch'} className="hover:text-blue-500 transition duration-300">Filial</Link>
                </div>
                <div>
                    <Link href={'/sector'} className="hover:text-blue-500 transition duration-300">Setor</Link>
                </div>
                <div>
                    <Link href={'/supplier'} className="hover:text-blue-500 transition duration-300">Fornecedor</Link>
                </div>
                <div>
                    <Link href={'/profile'} className="hover:text-blue-500 transition duration-300">Perfil</Link>
                </div>
                <div>
                    <Link href={'/logs'} className="hover:text-blue-500 transition duration-300">Log</Link>
                </div>
                <div>
                    <button onClick={handleShow} className="hover:text-blue-500 transition duration-300">Arquivo</button>
                    {show == true ? (
                        <div className="flex flex-col bg-slate-600 ">
                            <div className="ml-5">
                                <button onClick={() => setShowImport(true)} className="hover:text-blue-500 transition duration-300">Importar</button>
                            </div>
                            <div className="ml-5">
                                <button onClick={() => setShowDelete(true)} className="hover:text-blue-500 transition duration-300">Excluir</button>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div>
                    <button onClick={handleReport} className="hover:text-blue-500 transition duration-300" >Relatório</button>
                    {showReport == true ? (
                        <ul className="ml-5">
                            <Link href={'#'}><li>Relatório</li></Link>
                        </ul>
                    ) : null}
                </div>
                <div>
                    <button onClick={handleExit}>Sair</button>
                </div>
            </div>
            {showImport && (
                <FormModal children={
                    <div>
                        <h2 className="text-lg font-bold mb-4">Importar</h2>
                        <p>Selecione o arquivo para importar.</p>
                        <form encType="multipart/form-data">
                            <input type="file" accept=".xlsx" required onChange={handleFileUpload} />
                            <div className="mt-5 flex justify-items">
                                <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Celula Inicial"} name={"cell1"} type={'text'} value={cellInit} onchange={changeCellInit}></InputForm>
                                <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Celula Final"} name={"cell2"} type={'text'} value={cellFinish} onchange={changeCellFinish}></InputForm>
                                <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Período Inicial"} name={"initPeriod"} type={'date'} value={initPeriod} onchange={changeInitPeriod}></InputForm>
                                <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Período Final"} name={"finishPeriod"} type={'date'} value={finishPeriod} onchange={changeFinishPeriod}></InputForm>
                                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Filial'} name={'branch'} datas={listBranch} value={branch} onchange={changeBranch}></InputSelect>
                            </div>
                            <button onClick={handleSubmit} className=" w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
                        </form>  
                         <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                    result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                        <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                    )
                }></MessageModal>
                    </div>
                } setShow={setShowImport}></FormModal>
            )}
            {showDelete && (
                <FormModal children={
                    <div>
                        <h1>Deletar</h1>
                        <div className="mt-5 flex justify-items">
                            <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Período Inicial"} name={"initPeriod"} type={'date'} value={initPeriod} onchange={changeInitPeriod}></InputForm>
                            <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Período Final"} name={"finishPeriod"} type={'date'} value={finishPeriod} onchange={changeFinishPeriod}></InputForm>
                            <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={'Filial'} name={'branch'} datas={listBranch} value={branch} onchange={changeBranch}></InputSelect>
                        </div>
                        <button onClick={handleDelete} className=" w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded">Deletar</button>
                        <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                    result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                        <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                    )
                }></MessageModal>
                    </div>
                    
                } setShow={setShowDelete}></FormModal>
            )}
             
        </div>
    )
}







