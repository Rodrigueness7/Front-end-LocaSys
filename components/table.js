
export default function Table ({Table, TrThead, Th, TrTbody, Td, headers, data, attributos}){
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
                 <tr className={TrTbody} key={row.idEquipment}>
                        {attributos.map(item =>(
                            <td className={Td}>{row[item]}</td> 
                        ))}
                </tr>
                ))}
            </tbody>
        </table>
    )
}