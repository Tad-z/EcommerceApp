import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import { useForm } from 'react-hook-form'
import ApiCall from './api/helper'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import "react-toastify/dist/ReactToastify.css";
import { getError } from '../reducers/error'


export default function SignupScreen() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, username, password }) => {
    // const id = toast.loading("Please wait...")
    try {
      const result = await ApiCall.postMethod("http://localhost:4000/user/signup", {
        username,
        email,
        password,
      });
      if (result) {
        // toast.update(id, {render: "You have signed up successfully", type: "success", isLoading: false});
        console.log("success");
      } else {
        // toast.update(id, {render: "Something went wrong", type: "serror", isLoading: false});
        console.log("error1");
      }
      // result && router.push('login');
    } catch (err) {
      toast.error(getError(err));
      console.log("error2");
    }
  }
  return (
    <>
      <Header title="signup" />
      <Main>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='mt-12 text-2xl text-center font-bold'>Create an Account</h1>
          <form className='my-5 mx-72 w-[600px] box-border border border-zinc-800 rounded-lg p-4' onSubmit={handleSubmit(submitHandler)}>
            <div className='p-1'>
              <h1 className='mb-5 text-xl font-semibold'>Personal Information</h1>
              <div className='mb-4'>
                <p htmlFor='username' className='font-bold mb-2 text-sm'>Username&nbsp;<span className='text-red-600'>*</span></p>
                <input
                  type="text"
                  {...register('username',
                    {
                      required: 'Please enter a valid username',
                      minLength: {
                        value: 4,
                        message: "Username should have minimum of 4 characters"
                      }
                    })}
                  className='w-[550px]  
                shadow-sm rounded bg-[#F2F2F2] py-2 px-4 outline-blue-300'
                  id="username"
                  autoFocus />
                {errors.username &&
                  (<div className='text-red-500'>{errors.username.message}
                  </div>)}
              </div>
              <div className='mb-4'>
                <p htmlFor='email' className='font-bold mb-2 text-sm'>Email&nbsp;<span className='text-red-600'>*</span></p>
                <input type="email"
                  {...register('email',
                    {
                      required: 'Please enter your email address',
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                        message: "Please enter a valid email address"
                      }
                    })}
                  className='w-[550px]  
                shadow-sm rounded bg-[#F2F2F2] py-2 px-4 outline-blue-300'
                  id="email"
                  autoFocus />
                {errors.email &&
                  (<div className='text-red-500'>{errors.email.message}
                  </div>)}
              </div>
              <div className='mb-4'>
                <p htmlFor='password' className='font-bold mb-4 text-sm'>Password &nbsp;<span className='text-red-600'>*</span></p>
                <input
                  type="password"
                  {...register('password',
                    {
                      required: 'Please enter a strong password',
                      minLength: {
                        value: 6,
                        message: "Password should have minimum of 6 characters"
                      },
                    })}
                  className='w-[550px] 
                shadow-sm rounded bg-[#F2F2F2] py-2 px-4  outline-blue-300'
                  id="password"
                  autoFocus />
                {errors.password &&
                  (<div className='text-red-500'>{errors.password.message}
                  </div>)}
              </div>
              <div className='mb-4'>
                <button className='sign-up-button'>Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </Main>
    </>

  )
}
