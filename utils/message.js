import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function Message({message}) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white w-96 p-12 rounded-xl shadow-lg text-center flex flex-col items-center">
                <ExclamationTriangleIcon className="h-24 w-24 text-yellow-500 mb-6"/>
                <p className="text-lg font-semibold">{message}</p>
            </div>
        </div>
    )
}