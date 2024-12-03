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
       <div>
         <div className="p-8 bg-slate-800 w-48 h-screen">
            <div>
                <Link href={'./users'} className="text-white">Usuários</Link>
            </div>
            <div>
                <Link href={'./equipment'} className="text-white">Equipamentos</Link>
            </div>
            <div>
                <Link href={'#'} className="text-white">Filials</Link>
            </div>
            <div>
                <Link href={'#'} className="text-white">Sectores</Link>
            </div>
        </div>
       </div>
    )
}