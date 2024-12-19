import Link from "next/link";

export default function Table ({Table, TrThead, Th, TrTbody, Td, headers, data, attributos, id, href, classButton, bt}){
    return(
        <table className={Table}>
            <thead>
               <tr className={TrThead}>
               {headers.map((header, index) => (
                    <th className={Th} key={index}>
                        {header}
                    </th>
                ))}
               </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row[id]} className={TrTbody}>
                        {attributos.map(item =>(
                            <td key={item} className={Td}>{row[item]}</td>   
                        ))}
                        <td><button className={classButton}><Link href={href}></Link>{bt}</button></td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}