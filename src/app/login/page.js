'use client'
import { useState } from "react";
import InputForm from "../../components/InputForm";
import { setCookie } from "cookies-next";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";


export default function Login() {

  const route = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')



  const changeUsername = (e) => {
    setUsername(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const submit = async (e) => {
    e.preventDefault()

    let fetchData = {
      username: username,
      password: password
    }

    let data = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/login`, {
      method: 'POST',
      body: JSON.stringify(fetchData),
      headers: {
        'content-type': 'application/json'
      }
    })

    
    let value = await data.json()
    setCookie('token', value.token, { maxAge: 8600000 })
    
    if (value.successMessage) {
      route.push('./')
      localStorage.setItem('username', username)
      localStorage.setItem('permission', jwtDecode(value.token).permission)
     
      setTimeout(() => {
        localStorage.clear()
      }, 8600000)

     }
    
    if (value.errorMessage) {
      setResult('Usuário ou Senha inválido')
      setTimeout(() => { setResult('') }, 1000)
    }
  }

  

  return (
    <section className="bg-gray-100 h-screen flex justify-center items-center w-full">
      <div className="flex justify-center items-center flex-col bg-white shadow hover:shadow-lg h-96 w-96 rounded-lg relative">
        <form onSubmit={submit}>
          <div>
            <h1 className="font-sans pb-8 text-2xl">Acesse a sua conta</h1>
          </div>
          <InputForm classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} classNameLabe={" mb-2 text-sm font-medium text-gray-900"} label={'Username'} type={'text'} value={username} onchange={changeUsername}></InputForm>
          <InputForm classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} classNameLabe={" mb-2 text-sm font-medium text-gray-900"} label={'Password'} type={'password'} value={password} onchange={changePassword}></InputForm>
          <button type="submit" className="w-64 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Acesse</button>
        </form>
        <div className="absolute bottom-8">{result}</div>
      </div>
    </section>
  );
}
