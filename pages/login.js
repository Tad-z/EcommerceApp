import Link from 'next/link'
import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import { useForm } from 'react-hook-form'
import ApiCall from './api/hello'
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify'
import { getError } from '../container/error'
import { useRouter } from 'next/router'

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const router = useRouter()
  const submitHandler = async ({ username, password }) => {
    try {
      const response = await ApiCall.postMethod("http://localhost:4000/user/login", {
        username,
        password,
      });
      
      if (response) {
        toast("You are logged in");
        const data = response.data;
        const { token } = data
        localStorage.setItem("token", token)
        localStorage.setItem("isAuthenticated", true)
        console.log("success");
      } else {
        toast.error("Something went wrong")
        console.log("error1");
      }
      router.push('/')
    } catch (err) {
      toast.error(getError(err));
      console.log(err.message);
    }
  }

  // const [username, setUsername] = React.useState("")
  // const [password, setPassword] = React.useState("")

  // console.log("username", username)

  // async function loginUserHandler() {
  //   if (username === "" || password === "") return
    
  //   const response = await ApiCall.post('http://localhost:4000/user/login', {
  //     username: username,
  //     password: password
  //   })

   

  // const buttonIsDisabled = username === "" || password === ""

  return (
    <>
      <Header title="login" />
      <Main>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='mt-12 text-2xl text-center font-bold'>Login</h1>
          <form className='my-5 mx-72 w-[600px] box-border border border-zinc-800 rounded-lg p-4' onSubmit={handleSubmit(submitHandler)}>
            <div className='p-1'>
              <h1 className='mb-5 text-xl font-semibold'>Sign-In Information</h1>
              <div className='mb-4'>
                <p htmlFor='username' className='font-bold mb-2 text-sm'>Username&nbsp;<span className='text-red-600'>*</span></p>
                <input
                  type="text"
                  {...register('username', { required: 'Please enter a valid username', minLength:{value: 4, message: "Username should have minimum of 4 characters"}})}
                  className='w-[550px] rounded shadow-sm bg-[#F2F2F2] py-2 px-4 outline-blue-300'
                  id="username"
                  autoFocus
                  // value={username}
                  // onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (<div className='text-red-500'>{errors.username.message}</div>)}
              </div>
              <div className='mb-4'>
                <p htmlFor='password' className='font-bold mb-2 text-sm'>Password &nbsp;<span className='text-red-600'>*</span></p>
                <input
                  type="password"
                  {...register('password', { required: 'Please enter a strong password', minLength:{value: 6, message: "Password should have minimum of 6 characters"},
                  })}
                  className='w-[550px] rounded mb-4 shadow-sm bg-[#F2F2F2] py-2 px-4  outline-blue-300'
                  id="password"
                  autoFocus
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
              </div>
              <div className='mb-4'>
                <button type='submit'
                  // disabled={buttonIsDisabled}
                  className='sign-up-button'
                  // onClick={loginUserHandler}
                >Log In</button>
              </div>
              <div className='mb-4'>
                Don&apos;t have an account? &nbsp;
                <Link href="signup">
                  Create an account
                </Link>
              </div>
            </div>

          </form>

        </div>
      </Main>
    </>
    


  )
}
