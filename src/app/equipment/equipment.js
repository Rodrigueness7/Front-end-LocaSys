'use client'

import FormModal from "@/components/formModal"
import InputForm from "@/components/InputForm"
import InputSelect from "@/components/InputSelect"
import MessageModal from "@/components/messageModal"
import Table from "@/components/table"
import fetchData from "@/utils/fetchData"
import updateData from "@/utils/updateData"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use, useCallback, useEffect, useMemo, useState } from "react"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

export default function Equipment({ tableEquipment, attribute, token, dataUser, dataSector, dataType, dataBranch, dataSupplier, dataSituation }) {


    const users = dataUser.map(item => item.username)
    const sectors = dataSector.map(item => item.sector)
    const types = dataType.map(item => item.typeEquipment)
    const branches = dataBranch.map(item => item.branch)
    const suppliers = dataSupplier.map(item => item.supplier)



    const router = useRouter()
    const [dataEquipment, setDataEquipment] = useState(tableEquipment.filter(item => item['Situação'] !== 'Inativo' && item['Situação'] !== 'Devolvido'))
    const [codProd, setCodProd] = useState('')
    const [equipment, setEquipment] = useState('')
    const [type, setType] = useState('')
    const [branch, setBranch] = useState('')
    const [username, setUsername] = useState('')
    const [permission, setPermission] = useState([])
    const [show, setShow] = useState(false)
    const [listUser, setListUser] = useState('')
    const [listSector, setListSector] = useState('')
    const [listType, setListType] = useState('')
    const [listBranch, setListBranch] = useState('')
    const [listSupplier, setListSupplier] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [result, setResult] = useState('')
    const [listIdEquipment, setListIdEquipment] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])




    useEffect(() => {
        let data = localStorage.getItem('permission')
        if (!data) {
            return router.push('/login')
        }
        let number = data.split(',').map(number => number)
        setPermission(number)

    }, [router])

    useEffect(() => {
        const updateValue = () => {
            const stored = localStorage.getItem('id');
            setListIdEquipment(stored ? JSON.parse(stored) : []);
        };

        updateValue();

        window.addEventListener('storage', updateValue);
        window.addEventListener('local-storage-change', updateValue);

        return () => {
            window.removeEventListener('storage', updateValue);
            window.removeEventListener('local-storage-change', updateValue);
        };
    }, []);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedOptions((prev) => [...prev, value]);
        } else {
            setSelectedOptions((prev) =>
                prev.filter((option) => option !== value)
            );
        }
    };


    const generation = async () => {
        sessionStorage.setItem('dataEquipment', JSON.stringify(dataEquipment))

        if (dataEquipment.length <= 0) {
            return alert('Não existe dados para gerar relatório')
        }
        window.open(`/equipment/report`, '_blank')
    }


    const filter = () => {
    return tableEquipment.filter((item) => {

        if (selectedOptions.length === 0) {
            if (item['Situação'] === 'Inativo' || item['Situação'] === 'Devolvido') {
                return false;
            }
        }

        return (
            (codProd ? item['Código'] == codProd : true) &&
            (equipment ? item['Equipamento'] === equipment : true) &&
            (type ? item['Tipo'] === type : true) &&
            (branch ? item['Filial'] === branch : true) &&
            (username ? item['Usuario'] === username : true) &&
            (selectedOptions.length > 0 
                ? selectedOptions.includes(item['Situação']) 
                : true)
        );
    });
};



    const getOptions = useCallback((field, ignore = '') => {
        const dataFilter = tableEquipment.filter((item) =>
            (codProd && ignore != 'Código' ? item['Código'] == codProd.toString() : true) &&
            (equipment && ignore != 'Equipamento' ? item['Equipamento'] === equipment : true) &&
            (type && ignore != 'Tipo' ? item['Tipo'] === type : true) &&
            (branch && ignore != 'Filial' ? item['Filial'] === branch : true) &&
            (username && ignore != 'Usuario' ? item['Usuario'] === username : true) &&
            (selectedOptions.length > 0 && ignore != 'Situação' ? selectedOptions.includes(item['Situação']) : true)
        );
        const options = dataFilter.map(item => item[field]);
        return [...new Set(options)];
    }, [codProd, equipment, type, branch, username, selectedOptions, tableEquipment]);


    const optionsBranch = useMemo(() => getOptions('Filial', 'Filial'), [getOptions]).sort((a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });

    const optionsType = useMemo(() => getOptions('Tipo', 'Tipo'), [getOptions]).sort((a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });

    const optionsEquipment = useMemo(() => getOptions('Equipamento', 'Equipamento'), [getOptions]).sort((a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });

    const optionsUsername = useMemo(() => getOptions('Usuario', 'Usuario'), [getOptions]).sort((a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });


    const changeCodProd = (e) => {
        const newValue = e.target.value

        if (/^[0-9]*$/.test(newValue) && newValue.length <= 10) {
            setCodProd(newValue)
        }
    }

    const changeEquipment = (e) => {
        setEquipment(e.target.value)

    }


    const changeType = (e) => {
        setType(e.target.value)

    }

    const changeBranch = (e) => {
        setBranch(e.target.value)
    }

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changeListUser = (e) => {
        setListUser(e.target.value)
    }

    const changeListSector = (e) => {
        setListSector(e.target.value)
    }

    const changeListType = (e) => {
        setListType(e.target.value)
    }

    const changeListBranch = (e) => {
        setListBranch(e.target.value)
    }

    const changeListSupplier = (e) => {
        setListSupplier(e.target.value)
    }

    const searchEquipment = (e) => {
        e.preventDefault()

        setDataEquipment(filter())
        setIsOpen(false)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            window.location.reload()
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


    const transfer = (e) => {
        e.preventDefault()
        if (listIdEquipment.length === 0) {
            return alert('Não há item para transferir');
        }


        const idUser = listUser != "" ? dataUser.find(item => item.username === listUser).idUser : ""
        const idSector = listSector != "" ? dataSector.find(item => item.sector === listSector).idSector : ""
        const idBranch = listBranch != "" ? dataBranch.find(item => item.branch === listBranch).idBranch : ""
        const idSupplier = listSupplier != "" ? dataSupplier.find(item => item.supplier === listSupplier).idSupplier : ""
        const idTypeEquipment = listType != "" ? dataType.find(item => item.typeEquipment === listType).idTypeEquipment : ""



        listIdEquipment.map(async item => {
            let findEquipment = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findEquipmentId/${item}`, token)

            let data = {
                idTypeEquipment: listType === "" ? findEquipment['TypeEquipment'].idTypeEquipment : idTypeEquipment,
                idBranch: listBranch === "" ? findEquipment['Branch'].idBranch : idBranch,
                idUser: listUser === "" ? findEquipment['User'].idUser : idUser,
                idSector: listSector === "" ? findEquipment['Sector'].idSector : idSector,
                idSupplier: listSupplier === "" ? findEquipment['Supplier'].idSupplier : idSupplier,
            }

            await updateData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/transferEquipment/${item}`, data, token, setResult)
            setIsModalOpen(true)
        })

    }


    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen px-12 w-full'>
            <div className="flex justify-between mb-8 lg:px-8 sm:px-8 xl:w-1/2">
                {permission.find(number => number == '2') && (
                    <Link href={'../equipment/registerEquipment'}><button className='p-2 bg-indigo-500 rounded-lg text-white'>Novo Equipamento</button></Link>
                )}
                <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={generation}>Gerar Relatório</button>
                <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={handleShow}>Transferir Equipamento</button>
                {show == true ? (<FormModal setShow={setShow}>{
                    <div>
                        <p>{listIdEquipment.length === 0 ? 'Não há item marcado' : `Items marcados: ${listIdEquipment.length}`}</p>
                        <div className="w-full mt-5 flex justify-between relative h-36">
                            <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-45 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Filial'} name={'branch'} datas={branches} value={listBranch} onchange={changeListBranch} required={false}></InputSelect>
                            <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-45 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Usuário'} name={'username'} datas={users} value={listUser} onchange={changeListUser} required={false}></InputSelect>
                            <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-45 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Setor'} name={'sector'} datas={sectors} value={listSector} onchange={changeListSector} required={false}></InputSelect>
                            <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-45 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Tipo'} name={'TypeEquipment'} datas={types} value={listType} onchange={changeListType} required={false}></InputSelect>
                            <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-45 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Fornecedor'} name={'supplier'} datas={suppliers} value={listSupplier} onchange={changeListSupplier} required={false}></InputSelect>
                            <button className="p-2 bg-indigo-500 rounded-lg text-white absolute left-0 bottom-0 w-36 " onClick={transfer}>Alterar</button>
                            <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                                result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                                    <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                                )
                            }></MessageModal>
                        </div>
                    </div>
                }</FormModal>) : null}
            </div>
            <form className=" ml-8 flex relative" onSubmit={searchEquipment}>
                <InputForm classNameLabe={'block text-sm font-medium text-gray-700'} classNameInput={"mt-2 block w-32 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Código'} type={'text'} name={'codProd'} value={codProd} onchange={changeCodProd} maxLength={'10'}></InputForm>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-40 min-w-[160px] max-w-[200px] px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Equipamento'} name={'equipment'} datas={optionsEquipment} value={equipment} onchange={changeEquipment} required={false}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-45 min-w-[160px] max-w-[250px] px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Tipo'} name={'type'} datas={optionsType} value={type} onchange={changeType} required={false}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-40 min-w-[160px] max-w-[200px] px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Filial'} name={'branch'} datas={optionsBranch} value={branch} onchange={changeBranch} required={false}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-40 min-w-[160px] max-w-[200px] px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4 mr-4'} label={'Usuário'} name={'username'} datas={optionsUsername} value={username} onchange={changeUsername} required={false}></InputSelect>
                <div >
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="mt-6 cursor-pointer flex items-center px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm text-black w-56 "
                    >
                        {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Selecione Situações'}
                    </div>

                    {isOpen && (
                        <div className="absolute mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50  max-h-60 overflow-y-auto">
                            {dataSituation?.sucessMessage?.map((situation, index) => (
                                <label key={index} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <input type="checkbox" value={situation.situation} checked={selectedOptions.includes(situation.situation)} onChange={handleCheckboxChange} className="mr-2" />
                                    {situation.situation}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center ml-2 mt-2">
                    <button className='p-3 bg-indigo-500 rounded-lg text-white' type="submit">Buscar</button>
                </div>
            </form>
            <div className='ml-8 flex-1 h-[67%] overflow-x-auto'>
                <Table filterCheckbox={true} Table={'table-auto bg-white shadow-md rounded-lg w-full'} TrThead={'bg-gray-800 text-white text-nowrap rounded-lg'} Th={'py-3 px-4 text-left '} TrTbody={'border-b'} Td={'py-2 px-4 text-black text-nowrap'} headers={attribute} data={dataEquipment} attributos={attribute} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./equipment/updateEquipment'} bt={'...'} permission={permission.find(number => number == '3')}></Table>
            </div>
        </div>
    )
}