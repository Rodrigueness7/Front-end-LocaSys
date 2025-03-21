'use client'

import { Smile } from "lucide-react"


const MessageModal = ({isOpen, onClose, message}) => {
    if(!isOpen) return null

    return(
        <div className="relative z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm text-center">
                    <Smile className="text-green-600 w-16 h-16 mx-auto" />
                    <p className="text-gray-700 mt-4">{message}</p>
                    <button className="mt-6 px-4 py-2 bg-green-600 text-Black font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
        
    )
}

export default MessageModal