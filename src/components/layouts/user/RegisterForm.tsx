'use client';

import Container from '@/components/layouts/user/Container'
import Image from 'next/image'
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '@/lib/validations'
import { apiService } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const { login } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await apiService.register(data)

      if (response.success) {
        setSuccess('Registration successful! You can now login.')
        login(response.data, response.data.token)
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        setError(response.message || 'Registration failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <div>
        <div className='my-5 mx-2 lg:w-[70%] md:flex md:mx-auto md:h-[80vh] gap-8 justify-center items-center'>
          <div className='text-center my-4 flex-2'>
            <h1 className='text-[1.2rem] text-[#F5BB0B] font-semibold my-2 md:text-[2rem]'>Welcome, Hero of the Future</h1>
            <p className='text-sm leading-relaxed md:text-lg'>From final frame to future throne your legacy continues. One hero, one leader, rising beyond the screen into something greater.</p>
            <div className='hidden md:flex justify-center items-center'>
              <Image
                src="/Cup Number 277.png"
                width={400}
                height={300}
                alt='jana nayagan logo'
              />
            </div>
            <div className='hidden md:flex flex-col'>
              <p className='text-lg'>Your exclusive Collector&apos;s Item with a unique number awaits you.</p>
              <h1 className='text-[2rem] text-[#F5BB0B] font-semibold'>LEGACY LIVES</h1>
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
                <label className='text-sm text-[#F5BB0B] md:text-lg'>Name</label>
                <input
                  {...register('name')}
                  className='border-1 border-[#F5BB0B] outline-none rounded-md py-1 px-2 md:py-2'
                  placeholder='John Doe'
                />
                {errors.name && (
                  <span className='text-red-500 text-sm'>{errors.name.message}</span>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm text-[#F5BB0B] md:text-lg'>Email</label>
                <input
                  {...register('email')}
                  className='border-1 border-[#F5BB0B] outline-none rounded-md py-1 px-2 md:py-2'
                  type='email'
                  placeholder='johndoe@gmail.com'
                />
                {errors.email && (
                  <span className='text-red-500 text-sm'>{errors.email.message}</span>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm text-[#F5BB0B] md:text-lg'>Password</label>
                <input
                  {...register('password')}
                  className='border-1 border-[#F5BB0B] outline-none rounded-md py-1 px-2 md:py-2'
                  type='password'
                  placeholder='*********'
                />
                {errors.password && (
                  <span className='text-red-500 text-sm'>{errors.password.message}</span>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm text-[#F5BB0B] md:text-lg'>Phone</label>
                <input
                  {...register('phone')}
                  className='border-1 border-[#F5BB0B] outline-none rounded-md py-1 px-2 md:py-2'
                  type='tel'
                  placeholder='+1234567890'
                />
                {errors.phone && (
                  <span className='text-red-500 text-sm'>{errors.phone.message}</span>
                )}
              </div>

              <p className='text-sm md:text-md'>Do you have a account? <Link href="/login" className="underline text-[#F5BB0B]">login</Link></p>

              <button
                type='submit'
                disabled={isLoading}
                className='bg-[#F5BB0B] text-black py-1 rounded-md cursor-pointer my-2 md:text-lg disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className='flex justify-center items-center gap-2 my-2'>
              <span className='w-[100%] h-[2px] bg-gray-700'></span>
              <span className='text-gray-700'>OR</span>
              <span className='w-[100%] h-[2px] bg-gray-700'></span>
            </div>
            <div>
              <button className='bg-white py-1 rounded-md w-full cursor-pointer md:py-2'>
                <FcGoogle className='text-center w-full' />
              </button>
            </div>
            <div className='my-4 text-center md:hidden'>
              <p className='text-sm leading-relaxed'>Your exclusive Collector&apos;s Item with a unique number awaits you.</p>
              <h1 className='text-[1.2rem] text-[#F5BB0B] font-semibold'>LEGACY LIVES</h1>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default RegisterForm