'use client'

import InputForm from "@/components/InputForm"
import Table from "@/components/table"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Supplier({ tableSupplier }) {
    const router = useRouter()
    const [dataSupplier, setDataSupplier] = useState(tableSupplier)
    const [supplier, setSupplier] = useState('')
    const [permission, setPermission] = useState([])
    
    
        useEffect(() => {
            let data = localStorage.getItem('permission')
            if (!data) {
                return router.push('/login')
            }
            let number = data.split(',').map(number => number)
            setPermission(number)
        }, [router])

    const data = dataSupplier.map((item) => {
        let dataTable = {
            ['id'] : item.idSupplier,
            ['Fornecedor'] : item.supplier,
            ['Email'] : item.email,
            ['Contato'] : item.contact,
            ['CNPJ'] : item.CNPJ,
            ['Endereço'] : item.address,
            ['Cep'] : item.zipCode,
            ['Estado'] : item.state,
            ['Cidade'] : item.city
        }
        return dataTable
    })



    const filter = () => {
        return tableSupplier.filter((item) => {
            return (
                (supplier ? item.supplier.toLowerCase() == supplier.toLowerCase().trim() : true)
            )
        })
    }

    const changeSupplier = (e) => {
        setSupplier(e.target.value)
    }

    const searchSupplier = (e) => {
        e.preventDefault()
        setDataSupplier(filter())
    }

    const generation = async () => {
        sessionStorage.setItem('dataSupplier', JSON.stringify(data))
        if(data.length <= 0) {
            return alert('Não há dados para gerar relatório')
        }
       window.open(`/supplier/report`, '_blank') 
 }

    return (
        <div className="bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full">
            <div className="flex justify-between mb-8 lg:px-8 sm:px-8 items-center xl:w-1/2">
                {permission.find(number => number == '45') && (
                    <Link href={'../supplier/registerSupplier'}><button className='p-2 bg-indigo-500 rounded-lg text-white'>Novo Fonercedor</button></Link>
                )}
                <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={generation}>Gerar Relatório</button>
            </div>
            <form className=" ml-8 flex relative" onSubmit={searchSupplier}>
                <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Fornecedor'} type={'text'} name={'supplier'} value={supplier} onchange={changeSupplier} maxLength={'10'}></InputForm>
                <div className="flex items-center ml-2 mt-2">
                    <button className='p-3 bg-indigo-500 rounded-lg text-white' type="submit">Buscar</button>
                </div>
            </form>
            <div className="ml-8 flex-1 overflow-x-auto">
                <Table Table={'table-auto bg-white shadow-md rounded-lg w-full'} TrThead={'bg-gray-800 text-white sticky top-0 z-10 text-nowrap rounded-lg'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4 text-black text-nowrap'} headers={['id', 'Fornecedor', 'Email', 'Contato', 'CNPJ', 'Endereço', 'Cep', 'Estado', 'Cidade']} data={dataSupplier} attributos={['idSupplier', 'supplier', 'email', 'contact', 'CNPJ', 'address', 'zipCode', 'state', 'city']} id={'idSupplier'} href={'./supplier/updateSupplier'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} bt={'...'} permission={permission.find(number => number == '46')}></Table>
            </div>
        </div>
    )
}