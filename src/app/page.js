import Link from "next/link";


export default function Home() {
    return(
       <div>
         <div className="p-8 bg-slate-800 w-48 h-screen ">
            <div>
                <Link href={'./register'} className="text-white">Usuários</Link>
            </div>
            <div>
                <Link href={'#'} className="text-white">Equipamentos</Link>
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