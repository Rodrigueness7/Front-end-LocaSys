import InputForm from "../../../components/InputForm";
import InputSelect from "../../../components/InputSelect";

export default function Register() {
    let sector = ['TI', 'Tesouraria', 'Contabilidade', 'RH']
    let filial = [1, 2]
    return(
       <section className="bg-gray-100">
            <div className="flex items-center justify-center flex flex-col h-screen" >
                <div>
                    <h1 className="font-sans pb-8 text-2xl pb-8 text-center">Registra a sua conta</h1>
                </div>
                <form className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"First name"} name={"firstName"} type={'text'}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Last name"} name={"lastName"} type={'text'}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"CPF"} name={"CPF"} type={'text'}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Username"} name={"username"} type={'text'}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Password"} name={"password"} type={'password'}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Password"} name={"password"} type={'password'}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Email"} name={"email"} type={'email'}></InputForm>
                    <InputForm classNameLabe={"block"} classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} label={"Email"} name={"email"} type={'email'}></InputForm>
                    <InputSelect classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} classNameLabel={"block"} label={'Setor'} name={'sector'} datas={sector}></InputSelect>
                    <InputSelect classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} classNameLabel={"block"} label={'Filial'} name={'filial'} datas={filial}></InputSelect>
                </form>
                <div>
                   <button className="w-64 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " >Cadastrar</button>
                </div>
            </div>
       </section>
    )
}

