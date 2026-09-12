'use client'
import { useState } from "react";
import InputForm from "../../../components/InputForm";
import InputSelect from "../../../components/InputSelect";
import addData from "../../../utils/addData";
import { useRouter } from "next/navigation";
import MessageModal from "@/components/messageModal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import SortItem from "@/utils/sortItem";
import fetchData from "../../../utils/fetchData";


export default function RegisterUser({ dataSector, dataProfile, dataUser, token }) {

    const listSector = SortItem(dataSector, 'sector').map(item => item.sector);
    const listProfile = SortItem(dataProfile, 'profile').map(item => item.profile);


    const router = useRouter()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cpf, setCpf] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmationEmail, setConfirmationEmail] = useState('')
    const [sector, setSector] = useState(listSector[0])
    const [profile, setProfile] = useState(listProfile[0])
    const [result, setResult] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])


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

    const changeFirstName = (e) => {
        let newFirstName = e.target.value
        if (newFirstName === '' || newFirstName.length <= 20) {
            setFirstName(newFirstName)
        }
    }

    const changeLastName = (e) => {
        let newLastName = e.target.value
        if (newLastName === '' || newLastName.length <= 20) {
            setLastName(newLastName)
        }
    }

    const changeCpf = (e) => {
        let newCpf = e.target.value
        if (newCpf === '' || newCpf.length <= 11) {
            setCpf(newCpf)
        }
    }

    const allowOnlyNumbers = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowRigth', 'arrowLeft', 'Tab', 'Home', 'End']

        if (allowedKeys.includes(e.key)) {
            return;
        }

        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }

    }

    const changeUsername = (e) => {
        let newUsername = e.target.value
        if (newUsername === '' || newUsername.length <= 20) {
            setUsername(newUsername)
        }

    }

    const changePassword = (e) => {
        let newPassword = e.target.value
        if (newPassword === '' || newPassword.length <= 22) {
            setPassword(e.target.value)
        }


    }

    const changeConfirmationPassword = (e) => {
        let newConfirmationPassword = e.target.value
        if (newConfirmationPassword === '' || newConfirmationPassword.length <= 22) {
            setConfirmationPassword(newConfirmationPassword)
        }
    }

    const changeEmail = (e) => {
        let newEmail = e.target.value
        if (newEmail === '' || newEmail.length <= 50) {
            setEmail(e.target.value)
        }

    }

    const changeConfirmationEmail = (e) => {
        let newConfirmationEmail = e.target.value
        if (newConfirmationEmail === '' || newConfirmationEmail.length <= 50) {
            setConfirmationEmail(e.target.value)
        }
    }


    const changeProfile = (e) => {
        setProfile(e.target.value)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (result.success) {
            router.push('./')
        }
    }

    const addUser = async (e) => {
        e.preventDefault()
        if(dataUser.some(user => user.username === username)) {
            setResult({error: 'Usuário já cadastrado'})
            setIsModalOpen(true)
            return
        }
            
          const data = {
            firstName: firstName,
            lastName: lastName,
            cpf: cpf,
            username: username,
            password: password,
            confirmationPassword: confirmationPassword,
            email: email,
            confirmationEmail: confirmationEmail,
            idSector: dataSector.find(item => item.sector === sector).idSector,
            idProfile: dataProfile.find(item => item.profile === profile).idProfile
        }
        await addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addUser`, data, token, setResult)
        
        
        setTimeout(async () => { 
            const fetchUser = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllUser`, token)

            if(fetchUser.some(user => user.username === username)) {
               
                for(let sector of selectedOptions) {
                    const data = {
                        idUser: fetchUser.find(user => user.username === username).idUser,
                        idSector: dataSector.find(item => item.sector === sector).idSector
                    }
                   await addData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/addUser_sector`, data, token, setResult)  
                }
            } 
    }, 1000)
        
        setIsModalOpen(true)
        
    }

    return (
        <section className="bg-gray-100 py-3 w-full">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg" >
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Cadastro de Usuário</h1>
                <form className="grid grid-cols-1 gap-x-8 gap-y-4" onSubmit={addUser}>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"Nome"} name={"firstName"} type={'text'} value={firstName} onchange={changeFirstName}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"Sobrenome"} name={"lastName"} type={'text'} value={lastName} onchange={changeLastName}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"CPF"} name={"CPF"} type={'text'} value={cpf} onchange={changeCpf} onKeyDown={allowOnlyNumbers}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"Usuário"} name={"username"} type={'text'} value={username} onchange={changeUsername}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"Email"} name={"email"} type={'email'} value={email} onchange={changeEmail}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"Confirmação do Email"} name={"email"} type={'email'} value={confirmationEmail} onchange={changeConfirmationEmail}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"Senha"} name={"password"} type={'password'} value={password} onchange={changePassword}></InputForm>
                    <InputForm classNameLabe={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={"Confirmação da Senha"} name={"password"} type={'password'} value={confirmationPassword} onchange={changeConfirmationPassword}></InputForm>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Setor</span>
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="mt-2 cursor-pointer flex items-center px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm text-black w-full "
                        >
                            <span>
                                {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Selecione Setores'}
                            </span>
                            <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                                ▼
                            </span>
                        </div>
                        {isOpen && (
                            <div className="absolute mt-1 w- bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                                {dataSector.map((item, index) => (
                                    <label key={index} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <input type="checkbox" value={item.sector} checked={selectedOptions.includes(item.sector)} onChange={handleCheckboxChange} className="mr-2" />
                                        {item.sector}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                    <InputSelect classNameLabel={"block text-sm font-medium text-gray-700"} classNameInput={"mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"} div={'mb-4'} label={'Perfil'} name={'profile'} datas={listProfile} value={profile} onchange={changeProfile}></InputSelect>
                    <div className="mb-6">
                        <button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedw-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ">Cadastrar</button>
                    </div>
                </form>
                <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} message={result.error ? result.error : result.success} icone={
                    result?.error ? (<FaTimesCircle className="text-red-500 w-24 h-24 mx-auto mb-4 rounded-full" />) : (
                        <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4 rounded-full" />
                    )
                }></MessageModal>
            </div>
        </section>
    )
}

