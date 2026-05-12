import GraficoPizza from "../components/GraficoPizza";

export default function PageHome( {dataEquipments} ) {

   const situations = dataEquipments.reduce((acc, equipment) => {
     const situation = equipment?.Situation?.situation

    acc[situation] = (acc[situation] || 0) + 1

    return acc
}, {})

const objectSituations = Object.keys(situations)
const dataValues = Object.values(situations)



    return (
        <div className="w-full bg-gray-100 border border-gray-300 rounded-lg p-4">
            <div className="flex justify-start items-end h-full container mx-auto px-4 " >
                <GraficoPizza labels={objectSituations} dataValues={dataValues} />
            </div>  
        </div>
    )
}