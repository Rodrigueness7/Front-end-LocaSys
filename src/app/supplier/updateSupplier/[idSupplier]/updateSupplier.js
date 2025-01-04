'use client'

import { useState } from "react"
import InputForm from "../../../../../components/InputForm"

export default function UpdateSupplier({ idSupplier, data, token }) {

    const [supplier, setSupplier] = useState(data.supplier)
    const [email, setEmail] = useState(data.email)
    const [contact, setContact] = useState(data.contact)
    const [CNPJ, setCNPJ] = useState(data.CNPJ)
    const [address, setAddress] = useState(data.address)
    const [zipCode, setZipCode] = useState(data.zipCode)
    const [state, setState] = useState(data.state)
    const [city, setCity] = useState(data.city)
    const [result, setResult] = useState('')

    const changeSupplier = (e) => {
        let newSupplier = e.target.value
        if (newSupplier === '' || newSupplier.length <= 80) {
            setSupplier(newSupplier)
        }
    }

    const changeEmail = (e) => {
        let newEmail = e.target.value
        if (newEmail === '' || newEmail.length <= 80) {
            setEmail(newEmail)
        }
    }

    const changeContact = (e) => {
        let newContact = e.target.value
        if (newContact === '' || newContact.length <= 11) {
            setContact(newContact)
        }
    }

    const changeCNPJ = (e) => {
        let newCNPJ = e.target.value
        if (newCNPJ === '' || newCNPJ.length <= 14) {
            setCNPJ(newCNPJ)
        }
    }

    const changeAdress = (e) => {
        let newAddress = e.target.value
        if (newAddress === '' || newAddress.length <= 80) {
            setAddress(newAddress)
        }
    }

    const changeZipCode = (e) => {
        let newZipCode = e.target.value
        if (newZipCode === '' || newZipCode.length <= 45) {
            setZipCode(newZipCode)
        }
    }

    const changeState = (e) => {
        let newState = e.target.value
        if (newState === '' || newState.length <= 45) {
            setState(newState)
        }
    }

    const changeCity = (e) => {
        let newCity = e.target.value
        if (newCity === '' || newCity.length <= 45) {
            setCity(newCity)
        }
    }

    const UpdateSupplier = async () => {
        const data = {
            supplier: supplier,
            email: email,
            contact: contact,
            CNPJ: CNPJ,
            address: address,
            zipCode: zipCode,
            state: state,
            city: city,    
        }

        await fetch(`http://localhost:3001/updateSupplier/${idSupplier}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Authorization': token
            }
        }).then(
            result => result.json()
        ).then(
            res => setResult(res.message)
        )
    }

    const deleteSupplier = async () => {
        const data = {
            deletionDate: new Date().toLocaleDateString('pt-BR')
        }
        await fetch(`http://localhost:3001/inactivateSupplier/${idSupplier}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Authorization': token
            }
        }).then(
            result => result.json()
        ).then(
            res => setResult(res.message)
        )
    }

    return (
        <section className="bg-gray-100 py-3 ">
            <div className="flex items-start mb-8 lg:px-2 sm:px-0">
                <button onClick={deleteSupplier} className="p-2 bg-indigo-500 rounded-lg text-white">Deletar</button>
            </div>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Atualizar o Fornecedor</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Fornecedor"} name={"supplier"} type={'text'} value={supplier} onchange={changeSupplier}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Email"} name={"email"} type={'text'} value={email} onchange={changeEmail}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Contato"} name={"contact"} type={'text'} value={contact} onchange={changeContact}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"CNPJ"} name={"CNPJ"} type={'text'} value={CNPJ} onchange={changeCNPJ}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Endereço"} name={"address"} type={'text'} value={address} onchange={changeAdress}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"CEP"} name={"zipCode"} type={'text'} value={zipCode} onchange={changeZipCode}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Estado"} name={"state"} type={'text'} value={state} onchange={changeState}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"} div={'mb-4'} label={"Cidade"} name={"city"} type={'text'} value={city} onchange={changeCity}></InputForm>
                </form>
                <div className="mb-6">
                    <button onClick={UpdateSupplier} className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Atualizar</button>
                </div>
                <div>{result}</div>
            </div>
        </section>
    )
}