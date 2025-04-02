import Link from "next/link";

export default function Table({ Table, TrThead, Th, TrTbody, Td, headers, data, attributos, id, href, classButton, bt, positionTd }) {
    return (
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
                {data.map((row) => (
                    <tr key={row[id]} className={TrTbody}>
                        {attributos.map(item => (
                            <td key={item} className={Td}>{row[item]}</td>
                        ))}
                        <td className={positionTd}><Link href={href + `/${row[id]}`}><button className={classButton}>{bt}</button></Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}