'use client'

import InputSelect from "@/components/InputSelect"
import Table from "@/components/table"
import Link from "next/link"
import { useMemo, useState } from "react"


export default function Users({ tableUsers, attribute }) {

    const [dataUsers, setDataUsers] = useState(tableUsers)
    const [firstName, setFirstName] = useState('')
    const [username, setUsername] = useState('')
    const [sector, setSector] = useState('')
    const [profile, setProfile] = useState('')

   
    const filter = () => {
        return tableUsers.filter((item) => {
            return (
                (firstName ? item['Nome'] === firstName : true) &&
                (username ? item['Usuario'] === username : true) &&
                (sector ? item['Setor'] === sector : true) &&
                (profile ? item['Perfil'] === profile : true)
            )
        })
    }

    const getOptions = (field, ignore = '') => {
        const dataFilter = tableUsers.filter((item) =>
            (firstName && ignore != 'Nome' ? item['Nome'] === firstName : true) &&
            (username && ignore != 'Usuario' ? item['Usuario'] === username : true) &&
            (sector && ignore != 'Setor' ? item['Setor'] === sector : true) &&
            (profile && ignore != 'Perfil' ? item['Perfil'] === profile : true)
        )

        const options = dataFilter.map(item => item[field])
        return [... new Set(options)]
    }

    const optionsFirstName = useMemo(() => getOptions('Nome', 'Nome'), [username, sector, profile])
    const optionsUsername = useMemo(() => getOptions('Usuario', 'Usuario'), [firstName, sector, profile])
    const optionsSector = useMemo(() => getOptions('Setor', 'Setor'), [firstName, username, profile])
    const optionsProfile = useMemo(() => getOptions('Perfil', 'Perfil'), [firstName, username, sector])

    const changeFirstName = (e) => {
        let newFirstName = e.target.value
        if (newFirstName === '' || newFirstName.length <= 20) {
            setFirstName(newFirstName)
        }
    }


    const changeUsername = (e) => {
        let newUsername = e.target.value
        if (newUsername === '' || newUsername.length <= 20) {
            setUsername(newUsername)
        }

    }

    const changeSector = (e) => { setSector(e.target.value) }
    const changeProfile = (e) => { setProfile(e.target.value) }

    const searchUser = (e) => {
        e.preventDefault()
        setDataUsers(filter())

    }

    const generation = () => {
        sessionStorage.setItem('dataUser', JSON.stringify(dataUsers))
           window.open('/users/report', '_blank') 
    }

    return (
        <div className='bg-gray-100 py-8 overflow-x-auto h-screen w-full'>
            <div className="flex justify-between mb-8 lg:px-8 sm:px-8 xl:w-1/2">
                <Link href={'../users/registerUser'}><button className='p-2 bg-indigo-500 rounded-lg text-white w-full '>Novo Usuário</button></Link>
                <button className='p-2 bg-indigo-500 rounded-lg text-white' onClick={generation}>Gerar Relatório</button>
            </div>
            <form className=" ml-8 flex relative" onSubmit={searchUser}>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Nome'} name={'firstName'} datas={optionsFirstName} value={firstName} onchange={changeFirstName}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Usuario'} name={'username'} datas={optionsUsername} value={username} onchange={changeUsername}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Setor'} name={'sector'} datas={optionsSector} value={sector} onchange={changeSector}></InputSelect>
                <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4 mr-4'} label={'Perfil'} name={'profile'} datas={optionsProfile} value={profile} onchange={changeProfile}></InputSelect>
                <div className="flex items-center ml-2 mt-2">
                    <button className='p-3 bg-indigo-500 rounded-lg text-white' type="submit">Buscar</button>
                </div>
            </form>
            <div className='ml-8 flex-1'>
                <Table Table={'table-auto bg-white shadow-md rounded-lg overflow-hidden'} TrThead={'bg-gray-800 text-white'} Th={'py-2 px-4 text-left'} TrTbody={'border-b'} Td={'py-2 px-4'} headers={attribute} data={dataUsers} attributos={attribute} id={'id'} classButton={'p-2 bg-gray-900 rounded-lg text-white'} href={'./users/updateUser'} bt={'...'}></Table>
            </div>
        </div>

    )
}