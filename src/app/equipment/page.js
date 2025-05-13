import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import fetchData from '../../utils/fetchData'
import Message from '../../utils/message'
import Equipment from './equipment'


export default async function PageEquipment() {

    const cookieStore = cookies()
    const token = (await cookieStore).get('token')?.value

    if (!token) {
        redirect('./login')
    }

    const equipment = await fetchData('http://localhost:3001/findAllEquipment', token)
   

    if(equipment.message) {
        return(<Message message={'Usuário sem permissão'}/>)
    }

    
    let data = equipment.map(itens => {
        let result = {
            id: itens.idEquipment,
            ['Código']: itens.codProd,
            ['Equipamento']: itens.equipment,
            ['Tipo']: itens.type,
            ['Data Entrada']: new Date(itens.entryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
            ['Data Retorno']: itens.returnDate ? new Date(itens.returnDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
            ['Usuario']: itens['User'].username,
            ['Filial']: itens['Branch'].branch,
            ['Setor']: itens['Sector'].sector,
            ['Fornecedor']: itens['Supplier'].supplier
        }
        if(itens.value !== undefined) {
            result['Valor'] = itens.value
        }
        return result
    })
    let defaultAtrribute = ['Código', 'Equipamento', 'Tipo', 'Data Entrada', 'Data Retorno', 'Usuario', 'Filial', 'Setor', 'Fornecedor', 'Valor']
    let attribute = data.length === 0 ? defaultAtrribute : Object.keys(data[0]);
   
    
    return (
        <Equipment tableEquipment={data} attribute={attribute}></Equipment>
    )
}