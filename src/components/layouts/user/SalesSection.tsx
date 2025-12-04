"use client"

import Link from 'next/link'
import React from 'react'
import Container from './Container'

// const Heading = ({ content }: { content: string }) => {
//     return (
//         <h1 className='font-bold text-xs md:text-[1.2rem] lg:text-[1.5rem]'>{content}</h1>
//     )
// }

// const Paragraph = ({ content }: { content: string }) => {
//     return (
//         <p className='text-xs md:mt-1 md:text-[1.0rem] lg:text-[1.2rem]'>{content}</p>
//     )
// }

// const DivTag = ({ children }: {children: React.ReactNode}) => {
//     return (
//         <div className='flex justify-between flex-col gap-2 md:flex-row md:items-center'>
//             {children}
//         </div>
//     )
// }

const SalesSection = () => {
    // const [ index, setIndex ] = React.useState(0)
    const [timeLeft, setTimeLeft] = React.useState("")

    // const salesData = React.useMemo(
    //     () => [
    //         { id: 1, state: 'TN', sales: '54,00,000', progress: 64 },
    //         { id: 2, state: 'KL', sales: '72,50,000', progress: 79 }
    //     ],
    // [])

    // React.useEffect(() => {
    //     const intervel = setInterval(() => {
    //         setIndex((prev) => (prev + 1) % salesData.length)
    //     }, 3000)

    //     return () => clearInterval(intervel)
    // }, [salesData])

    React.useEffect(() => {
        const endDate = new Date("2025-12-16T00:00:00");

        const timer = setInterval(() => {
        const now = new Date();
        const diff = endDate.getTime() - now.getTime();

        if (diff <= 0) {
            setTimeLeft("0d 0h 0m 0s");
            clearInterval(timer);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    return (
        <Container>
            <div className='py-5 mb-20'>
                <div className='relative mx-2 md:mx-auto'>
                    <div className='relative rounded-[32px] border border-white/10 px-6 py-8 md:px-10 md:py-10 text-white overflow-hidden'>
                        <div className='absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_65%)] opacity-40 pointer-events-none' />
                        <div className='relative flex flex-col gap-8'>
                            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
                                <div>
                                    <p className='text-[0.6rem] uppercase tracking-[0.4rem] text-white/50'>Total Visitors</p>
                                    <div className='mt-3 flex flex-wrap items-end gap-3'>
                                        <h2 className='text-4xl font-black md:text-5xl'>10,000</h2>
                                        {/* <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-widest text-white/80'>
                                            <span className='inline-block h-2 w-2 animate-pulse rounded-full bg-[#F5BB0B]' />
                                            {salesData[index].state} • Live
                                        </span> */}
                                    </div>
                                    <p className='mt-2 text-xs text-white/60 md:text-sm'>Numbers refresh automatically for each leading state.</p>
                                </div>
                                <div className='rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center shadow-[0_15px_40px_rgba(0,0,0,0.35)]'>
                                    <p className='text-[0.6rem] uppercase tracking-[0.3rem] text-white/60'>Sales Ends In</p>
                                    <p className='mt-2 text-2xl font-bold text-[#F5BB0B] md:text-3xl'>{timeLeft}</p>
                                    <p className='mt-1 text-xs text-white/60'>Hurry before the vault closes</p>
                                </div>
                            </div>
                            {/* <div>
                                <DivTag>
                                    <Paragraph content='Next milestone unlocks exclusive lucky draw doubles.' />
                                    <Heading content={`${salesData[index].progress}% to goal`} />
                                </DivTag>
                                <div className='mt-4 h-2 rounded-full bg-white/10 overflow-hidden'>
                                    <div
                                        className='h-full rounded-full bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] transition-all duration-500 ease-out'
                                        style={{ width: `${salesData[index].progress}%` }}
                                    />
                                </div>
                                <div className='mt-2 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3rem] text-white/60'>
                                    <span>Goal • 1,00,00,000 Units</span>
                                    <span>Live Tracker</span>
                                </div>
                            </div> */}
                            <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                                <p className='text-sm text-white/70'>
                                    Each authenticated cup fuels community projects & doubles your chance in the Mega Lucky Draw.
                                </p>
                                <Link
                                    href='/product'
                                    className='inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] px-10 py-3 text-sm font-bold uppercase tracking-widest text-black shadow-[0_15px_50px_rgba(245,187,11,0.45)] transition-transform duration-200 hover:-translate-y-0.5'
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default SalesSection