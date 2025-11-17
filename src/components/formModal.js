
export default function FormModal({children, setShow}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-3xl shadow-lg  ">
                       {children}
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShow(false)} className="left-15 mt-4 bg-blue-500 text-white px-4 py-2 rounded float-rigth">Fechar</button>
                        </div>
                    </div>
                </div>
    )
}