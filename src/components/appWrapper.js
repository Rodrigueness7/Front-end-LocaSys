"use client";


import Menu from "@/components/menu";
import fetchData from "@/utils/fetchData";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import { useEffect, useMemo, useState } from "react";

export default function AppWrapper({ children }) {

    const pathname = usePathname();
    const hideMenuRoutes = useMemo(() => {
        return ["/login", '/reportComparative/comparativeEquipment', '/reportComparative/comparativeValue', '/equipment/report', '/branch/report', '/sector/report', '/supplier/report', '/users/report', '/reportComparative/divergentValue'];
    }, [])
    const token = getCookie("token");
    const [branch, setBranch] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, [])

   useEffect(() => {
        if (isClient && !hideMenuRoutes.includes(pathname) && token) {
            async function fetchBranches() {
                try {
                    const data = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllBranch`, token);
                    setBranch(data);
                } catch (error) {
                    console.error("Erro ao buscar branches:", error);
                }
            }
            fetchBranches();
        }
    }, [pathname, hideMenuRoutes, token, isClient]);

    const shouldHideMenu = hideMenuRoutes.includes(pathname);
    
    return (
        <div className="flex">
            {!shouldHideMenu && <Menu token={token} dataBranch={branch} />}
            {children}
        </div>
    )
}