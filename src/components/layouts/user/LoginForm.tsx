'use client'

import Container from '@/components/layouts/user/Container'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/validations'
import { apiService } from '@/lib/api'
import { useGoogleLogin } from '@react-oauth/google'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await apiService.login(data)

      if (response.success) {
        setSuccess('Login successful!')

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data))

        setTimeout(() => {
          if(typeof window !== 'undefined') {
            window.location.href = '/'
          }
        }, 1000)
      } else {
        setError(response.message || 'Login failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      try {
        const response = await apiService.googleLogin(tokenResponse.access_token)

        if (response.success) {
          setSuccess('Google login successful!')

          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data))

          setTimeout(() => {
            if(typeof window !== 'undefined') {
              window.location.href = '/'
            }
          }, 1000)
        } else {
          setError(response.message || 'Google login failed')
        }
      } catch {
        setError('An unexpected error occurred during Google login')
      } finally {
        setIsLoading(false)
      }
    },
    onError: (error) => {
      console.error('Google Login Error:', error)
      setError('Google login failed. Please try again.')
    },
  })

  return (
    <Container>
      <div>
        <div className='my-5 mx-2 lg:w-[70%] md:flex md:mx-auto md:h-[80vh] gap-8 justify-center items-center'>
          <div className='text-center my-4 flex-2'>
            <h1 className='text-[1.2rem] text-[#F5D57A] font-semibold my-2 md:text-[2rem]'>Welcome, Hero of the Future</h1>
            <p className='text-sm leading-relaxed md:text-lg'>A democracy cannot thrive where power remains unchecked and justice is reserved for a select few.</p>
            <div className='hidden md:flex justify-center items-center'>
              <Image
                src="/Cup Number 277.png"
                width={400}
                height={300}
                alt='jana nayagan logo'
              />
            </div>
            <div className='hidden md:flex flex-col'>
              <p className='text-lg'>Your exclusive {"Collector's"} Item with a unique number awaits you.</p>
              <h1 className='text-[2rem] text-[#F5D57A] font-semibold'>LEGACY LIVES</h1>
            </div>
          </div>
          <div className='flex-1'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                  {error}
                </div>
              )}
              {success && (
                <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded'>
                  {success}
                </div>
              )}

              <div className='flex flex-col gap-2'>
                <label className='text-sm text-[#F5D57A] md:text-lg'>Email</label>
                <input
                  {...register('email')}
                  className='border-1 border-[#F5D57A] outline-none rounded-md py-1 px-2 md:py-2'
                  type='email'
                  placeholder='johndoe@gmail.com'
                />
                {errors.email && (
                  <span className='text-red-500 text-sm'>{errors.email.message}</span>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm text-[#F5D57A] md:text-lg'>Password</label>
                <input
                  {...register('password')}
                  className='border-1 border-[#F5D57A] outline-none rounded-md py-1 px-2 md:py-2'
                  type='password'
                  placeholder='*********'
                />
                {errors.password && (
                  <span className='text-red-500 text-sm'>{errors.password.message}</span>
                )}
              </div>

              <p className='text-sm md:text-md'>{"Don't"} you have a account? <Link href="/register" className="underline text-[#F5D57A]">create account</Link></p>

              <button
                type='submit'
                disabled={isLoading}
                className='bg-[#F5D57A] text-black py-1 rounded-md cursor-pointer my-2 md:text-lg disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className='flex justify-center items-center gap-2 my-2'>
              <span className='w-[100%] h-[2px] bg-gray-700'></span>
              <span className='text-gray-700'>OR</span>
              <span className='w-[100%] h-[2px] bg-gray-700'></span>
            </div>
            <div>
              <button
                type='button'
                onClick={() => handleGoogleLogin()}
                disabled={isLoading}
                className='bg-white py-2 rounded-md w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <FcGoogle className='text-2xl' />
                <span className='text-gray-700 font-medium'>Continue with Google</span>
              </button>
            </div>
            <div className='my-4 text-center md:hidden'>
              <p className='text-sm leading-relaxed'>Your exclusive {"Collector's"} Item with a unique number awaits you.</p>
              <h1 className='text-[1.2rem] text-[#F5D57A] font-semibold'>LEGACY LIVES</h1>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LoginForm