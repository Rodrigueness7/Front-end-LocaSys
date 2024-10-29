'use client'
import { useState } from "react";
import InputForm from "../../components/InputForm";


export default function Home() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const changeUsername = (e) => {
    setUsername(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }
  
  const submit = (e) => {
    e.preventDefault()

    const values = {
      username: username,
      password: password
    }
    
    fetch('http://localhost:3001/login', {
      method:'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.token)
    })
  }
  

  return (
    <section className="bg-gray-100 h-screen flex justify-center items-center">
      <div className=" flex justify-center items-center flex-col bg-white shadow hover:shadow-lg h-80 w-96 rounded-lg">
        <form onSubmit={submit}>
        <div>
          <h1 className="font-sans pb-8 text-2xl">Acesse a sua conta</h1>
        </div>
        <InputForm classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} classNameLabe={" mb-2 text-sm font-medium text-gray-900"} label={'Username'} type={'text'} value={username} onchange={changeUsername}></InputForm>
        <InputForm classNameInput={"w-full font-sans pt-2 border-solid border-2 border-current rounded"} classNameLabe={" mb-2 text-sm font-medium text-gray-900"} label={'Password'} type={'password'} value={password} onchange={changePassword}></InputForm>
        <button type="submit" className="w-64 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Acesse</button>
        </form>
      </div>
    </section>
  );
}
