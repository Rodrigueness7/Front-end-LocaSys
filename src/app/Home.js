'use client'


import addData from "@/utils/addData";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react";


export default function PageHome({token}) {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [file, setFile] = useState(null)
    const [result, setResult] = useState(null)


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

    }   

    return (
        <div className="flex">
            <div className={`bg-slate-800 text-white w-64 h-screen p-8 space-y-4 md:block`}>
                <h1 className="font-bold text-2xl">Locasys</h1>
                <div >
                    <Link href={'./users'} className="hover:text-blue-500 transition duration-300">Usuário</Link>
                </div>
                <div>
                    <Link href={'./equipment'} className="hover:text-blue-500 transition duration-300">Equipamento</Link>
                </div>
                <div>
                    <Link href={'./branch'} className="hover:text-blue-500 transition duration-300">Filial</Link>
                </div>
                <div>
                    <Link href={'./sector'} className="hover:text-blue-500 transition duration-300">Setor</Link>
                </div>
                <div>
                    <Link href={'./supplier'} className="hover:text-blue-500 transition duration-300">Fornecedor</Link>
                </div>
                <div>
                    <Link href={'./profile'} className="hover:text-blue-500 transition duration-300">Perfil</Link>
                </div>
                <div>
                    <Link href={'./logs'} className="hover:text-blue-500 transition duration-300">Log</Link>
                </div>
                <div>
                    <button onClick={() => setShow(true)} className="hover:text-blue-500 transition duration-300">Importa</button>
                </div>
                <div>
                    <button onClick={handleExit}>Sair</button>
                </div>
            </div>
            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Importar</h2>
                        <p>Selecione o arquivo para importar.</p>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                             <input type="file" accept=".xlsx" onChange={handleFileUpload}/>
                            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
                        </form>
                        <button onClick={() => setShow(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Fechar</button> 
                    </div>
                </div>
            )}
        </div>
    )
}