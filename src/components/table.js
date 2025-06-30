'use client'
import Link from "next/link";
import { useState } from "react";

export default function Table({ Table, TrThead, Th, TrTbody, Td, headers, data, attributos, id, href, classButton, bt, positionTd }) {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = data.slice(startIndex, endIndex)

    const totalPages = Math.ceil(data.length / itemsPerPage)
    

    const changePage = (page) => {
        if(page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

     const generatePageList = () => {
        const pages = [];
        
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...');
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages;
    };


    return ( 
        <div>
        <table className={Table}>
            <thead>
                <tr className={TrThead}>
                    {headers.map((header, index) => (
                        <th className={Th} key={index}>
                            {header}
                        </th>    
                    ))}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {currentData.map((row) => (
                    <tr key={row[id]} className={TrTbody}>
                        {attributos.map(item => (
                            <td key={item} className={Td}>{row[item]}</td>
                        ))}
                        <td className={positionTd}><Link href={href + `/${row[id]}`}><button className={classButton}>{bt}</button></Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
         <div className="flex justify-center items-center items-center mt-4 space-x-2">
                <button onClick={() => changePage(currentPage - 1)} className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100" >
                    Anterior
                </button>
              {generatePageList().map((page, index) => (
                    <button 
                        key={index} 
                        onClick={() => page !== '...' && changePage(page)} 
                        className={`px-4 py-2 border-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}

                <button onClick={() => changePage(currentPage + 1)}
                    className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:gray-100" disabled={currentPage === totalPages}>
                    Próxima
                </button>
            </div>
        </div>
       
    )
}