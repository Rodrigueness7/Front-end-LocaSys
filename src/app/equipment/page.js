import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import fetchData from '../../utils/fetchData'
import Equipment from './equipment'
import { jwtDecode } from 'jwt-decode'


export default async function PageEquipment() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('/login')
    }

      let permission = jwtDecode(token).permission
      const number = permission.find(number => number == 1)


    if(number == undefined) {
        redirect('/')
    }

    const equipment = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllEquipment`, token)
   
    
    let data = equipment.map(itens => {

        if(itens.deletedAt == null) {
            let result = {
            id: itens.idEquipment,
            ['Código']: itens.codProd,
            ['Equipamento']: itens.equipment,
            ['Tipo']: itens['TypeEquipment'].typeEquipment,
            ['Data Entrada']: new Date(itens.entryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
            ['Data Retorno']: itens.returnDate ? new Date(itens.returnDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
            ['Usuario']: itens['User'] == null ? '' : itens['User'].username,
            ['Filial']: itens['Branch'].branch,
            ['Setor']: itens['Sector'] == null ? '' : itens['Sector'].sector,
            ['Fornecedor']: itens['Supplier'].supplier,
            ['Situação']: itens['Situation'].situation,

        }
        if(itens.value !== undefined) {
            result['Valor'] = itens.value
        }
        return result
            
        }
       
    })

 
    let defaultAtrribute = ['Código', 'Equipamento', 'Tipo', 'Data Entrada', 'Data Retorno', 'Usuario', 'Situação', 'Filial', 'Setor', 'Fornecedor', 'Valor']
    let attribute = data.length === 0 ? defaultAtrribute : Object.keys(data[data.length - 1]);
   
    let dataUser = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllUser`, token)
    let dataSector = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSector`, token)
    let dataType = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllTypeEquipment`, token)
    let dataBranch = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllBranch`, token)
    let dataSupplier = await fetchData(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/findAllSupplier`, token)

   
    
    return (
        <Equipment tableEquipment={data} attribute={attribute} token={token} dataUser={dataUser} dataSector={dataSector} dataType={dataType} dataBranch={dataBranch} dataSupplier={dataSupplier}></Equipment>
    )
}