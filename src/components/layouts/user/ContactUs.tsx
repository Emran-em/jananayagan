'use client'

import React, { useState } from 'react'
import { sendEmail, isValidEmail } from '@/lib/emailjs'
import Container from './Container';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            setSubmitStatus({ type: 'error', message: 'Please enter your name' });
            return;
        }

        if (!formData.email.trim() || !isValidEmail(formData.email)) {
            setSubmitStatus({ type: 'error', message: 'Please enter a valid email' });
            return;
        }

        if (!formData.message.trim()) {
            setSubmitStatus({ type: 'error', message: 'Please enter a message' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const success = await sendEmail({
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: 'Sugimx Support Team'
            });

            if (success) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Thank you! Your message has been sent successfully.'
                });

                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: 'Failed to send message. Please try again.'
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                setSubmitStatus({
                    type: 'error',
                    message: error.message
                });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: 'An error occurred. Please try again later.'
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
        <div className='max-w-[1800px] mx-auto'>
            <div className='my-10 md:my-20 md:mx-20'>
                <h1 className='text-center text-[1.5rem] bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] text-transparent bg-clip-text font-semibold md:text-[3rem]'>CONTACT US</h1>
                <div className='flex flex-col md:flex-row justify-around items-center border-1 border-[#F5BB0B] rounded-lg md:rounded-4xl md:py-8'>
                    <div className='my-4 mx-2 md:mx-12 flex-1'>
                        <h1 className=' bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] text-transparent bg-clip-text text-[1.2rem] font-semibold mb-2 text-center md:text-start md:text-[3rem]'>The Legacy Beyond the Curtain</h1>
                        <p className='text-sm md:text-lg text-[#fff]'>Forever one hero, one leader though the curtain falls, his influence only rises. In power, memory, and story, he endures, shaping the future where legends are born, live on, and inspire generations long after their final act has ended.</p>
                        <p className='text-[#F5BB0B]'>support@sugimx.com</p>
                        {/* <p className='text-white'>9489519652</p> */}
                    </div>
                    <div className="md:flex h-100 hidden">
                        <div className='w-[2px] h-full bg-[#F5BB0B]'></div>
                    </div>
                    <form onSubmit={handleSubmit} className='flex-1 md:mx-12 w-[80%] my-4 flex gap-4 flex-col text-white'>
                        {submitStatus.type && (
                            <div className={`p-3 rounded-lg text-center ${
                                submitStatus.type === 'success'
                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                    : 'bg-red-100 text-red-700 border border-red-300'
                            }`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <div className='flex flex-col gap-2'>
                            <label className=' bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] text-transparent bg-clip-text text-sm md:text-lg'>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className='border-1 border-[#F5BB0B] text-[#F5BB0B] outline-none rounded-lg py-2 px-2'
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className=' bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] text-transparent bg-clip-text text-sm md:text-lg'>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className='border-1 border-[#F5BB0B] text-[#F5BB0B] outline-none rounded-lg py-2 px-2'
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className=' bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] text-transparent bg-clip-text text-sm md:text-lg'>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className='border-1 border-[#F5BB0B] text-[#F5BB0B] outline-none rounded-lg h-40 py-2 px-2'
                                disabled={isSubmitting}
                            />
                        </div>
                        <button
                            type="submit"
                            className='w-full bg-[#F5BB0B] rounded-md py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-[#000] cursor-pointer'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </Container>
    )
}

export default ContactUs