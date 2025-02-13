import React, { useState } from 'react'
import { loginAPI, registerAPI } from '../services/allAPI';
import { Link, useNavigate } from 'react-router-dom';

const Auth = ({insideRegister}) => {
  const navigate = useNavigate()
  const [inputData,setInputData] = useState({
    username:"",email:"",password:""
  })
  console.log(inputData);

  const handleRegister = async(e)=>{
    e.preventDefault()
    console.log("Inside handleRegister");
    if(inputData.username && inputData.email && inputData.password){
      try {
       const result = await registerAPI(inputData)
       if(result.status==200){
        alert(`Welcome ${result.data?.username} Please login...`)
        navigate('/login')
        setInputData({ username:"",email:"",password:""})
        
       }else{
        if(result.response.status==406){
          alert(result.response.data)
          setInputData({ username:"",email:"",password:""})
        }
       }
      } catch (err) {
        console.log(err);
      }
    }else{
      alert("Please provide all details")
    }
    
  }
  const handleLogin = async(e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password){
      try {
        const result = await loginAPI(inputData)
        if(result.status==200){
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setInputData({username:"",email:"",password:""})
          navigate('/')
        }else{
          if(result.response.status==404){
            alert(result.response.data)
          }
        }
      } catch (err) {
        console.log(err);
        
      }
    }else{
      alert("Please provide all details")
    }
  }
  return (
    <>

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-2xl h-4 mr-2" src='https://neon.gbjsolution.com/content/images/2022/12/logo-light.svg' alt="logo" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {insideRegister? "Sign Up": " Login "} to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                {insideRegister && <div>
                  <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                  <input value={inputData.username} onChange={e=> setInputData({...inputData,username:e.target.value})} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                </div>
                  }
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input value={inputData.email} onChange={e=> setInputData({...inputData,email:e.target.value})}  type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input value={inputData.password} onChange={e=> setInputData({...inputData,password:e.target.value})}  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label for="remember" className="text-gray-500 dark:text-gray-300">Agree to the terms of use and privacy policy</label>
                    </div>
                  </div>
                </div>
                {insideRegister ?
                <button onClick={handleRegister} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> Create Account</button>
                :
                <button onClick={handleLogin} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                }
                {
                  insideRegister
                    ?
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an accout <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" style={{ cursor: 'pointer' }}><Link to={'/login'}>Login here</Link>  </a>
                    </p>
                    :
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account yet? <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" style={{ cursor: 'pointer' }}><Link to={'/register'}>Sign Up here</Link></a>
                    </p>
                }



              </form>
            </div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default Auth 