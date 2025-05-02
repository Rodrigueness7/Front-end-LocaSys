'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";


export default function PageHome() {
    const router = useRouter()

    const handleExit = () => {
        const clearCookie = (name) => {
            document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
          };
          
          clearCookie('token');
          localStorage.clear()
          router.push('./login')
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
                    <Link href={'./logs'} className="hover:text-blue-500 transition duration-300">Logs</Link>
                </div>
                <div>
                    <button onClick={handleExit}>Sair</button>
                </div>
            </div>
        </div>
    )
}