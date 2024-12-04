'use client'

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";


export default function Home() {
    const router = useRouter()

    useEffect(() => {
        const cookies = getCookie('token')
       
        if(!cookies) {
            router.push('./login')
        }
    }, [])

    return(
       <div className="flex">
         <div className={`bg-slate-800 text-white w-64 h-screen p-8 space-y-4 md:block`}>
            <div >
                <Link href={'./users'} className="hover:text-blue-500 transition duration-300">Usuários</Link>
            </div>
            <div>
                <Link href={'./equipment'} className="hover:text-blue-500 transition duration-300">Equipamentos</Link>
            </div>
            <div>
                <Link href={'#'} className="hover:text-blue-500 transition duration-300">Filials</Link>
            </div>
            <div>
                <Link href={'#'} className="hover:text-blue-500 transition duration-300">Setores</Link>
            </div>
        </div>
       
       </div>
    )
}