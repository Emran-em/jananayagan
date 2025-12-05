import React from 'react'
import Image from 'next/image'
import Container from './Container'

const prizes = [
    {
        place: 'Grand Prize',
        amount: '₹27,70,000',
        note: 'Mega Jackpot',
        accent: '#F5BB0B',
        glow: 'rgba(245, 187, 11, 0.4)',
        background: 'linear-gradient(135deg, rgba(245,187,11,0.15), rgba(15,7,30,0.6))',
        image: 'prize'
    },
    {
        place: '2nd Prize',
        amount: 'Thar Roxx',
        note: 'Twin Bonanza',
        accent: '#FF6B00',
        glow: 'rgba(255, 107, 0, 0.45)',
        background: 'linear-gradient(135deg, rgba(255,107,0,0.12), rgba(10,3,34,0.8))',
        image: 'car1'
    },
    {
        place: '3rd Prize',
        amount: 'Swift',
        note: 'Golden Streak',
        accent: '#7CFBFF',
        glow: 'rgba(124, 251, 255, 0.45)',
        background: 'linear-gradient(135deg, rgba(124,251,255,0.12), rgba(12,10,45,0.85))',
        image: 'car2'
    },
    {
        place: '4th – 10th Prize',
        amount: 'Bullet 350',
        note: '7 Winners',
        accent: '#C084FC',
        glow: 'rgba(192, 132, 252, 0.5)',
        background: 'linear-gradient(135deg, rgba(192,132,252,0.15), rgba(15,4,40,0.9))',
        image: 'bike'
    },
]

const LuckyDraw = () => {
    return (
        <Container>
            <div className='relative z-10 mx-auto px-5 md:px-10'>
                <div className='text-center mb-12'>
                    <p className='uppercase tracking-[0.5rem] text-xs md:text-sm text-[#F5BB0B]/80'>Exclusive Event</p>
                        <h1 className='text-3xl md:text-5xl font-black bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(255,187,11,0.35)]'>
                            Mega Lucky Draw 2025
                        </h1>
                    <p className='mt-4 text-base md:text-lg text-white/70'>
                        Every single cup purchase instantly unlocks a chance to win premium cash rewards and exclusive experiences.
                    </p>
                </div>

                <div className='flex flex-col gap-10 md:flex-row md:items-center max-w-7xl mx-auto'>
                    <div className='flex-1 space-y-6'>
                        <div className='relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.45)]'>
                            <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F5BB0B]/15 via-transparent to-transparent pointer-events-none' />
                            <div className='relative'>
                                <h2 className='text-xl md:text-2xl font-semibold text-[#FFED9F]'>Why Join?</h2>
                                <p className='mt-3 text-sm md:text-base text-white/70'>
                                    Participate in the most glamorous draw of the season. Collect your limited-edition cup, share the excitement, and watch your chances grow with every purchase.
                                </p>
                                <ul className='mt-6 grid gap-4'>
                                    {prizes.map(prize => (
                                        <li
                                            key={prize.place}
                                            className='rounded-2xl border border-white/5 p-4 transition-all duration-300 hover:-translate-y-1'
                                            style={{
                                                background: prize.background,
                                                boxShadow: `0 15px 40px ${prize.glow}`,
                                            }}
                                        >
                                            <div className='flex items-center justify-between gap-3'>
                                                <Image
                                                    src={
                                                        prize.image === 'prize'
                                                        ? '/Money Illustration First Prize.png'
                                                        : prize.image === 'car1'
                                                        ? '/Thar Second Price.png'
                                                        : prize.image === 'car2'
                                                        ? '/Swift Third Prize.png'
                                                        : prize.image === 'bike'
                                                        ? '/Bullet Fourth Prize.png'
                                                        : ''
                                                    }
                                                    width={70}
                                                    height={70}
                                                    alt='prize image'
                                                />
                                                <div>
                                                    <p className='text-sm uppercase tracking-widest text-white/60'>{prize.place}</p>
                                                    <p className='text-2xl font-bold text-white'>{prize.amount}</p>
                                                </div>
                                                <span
                                                    className='hidden md:flex text-xs font-semibold px-3 py-1 rounded-full'
                                                    style={{
                                                        color: '#050113',
                                                        backgroundColor: prize.accent,
                                                        boxShadow: `0 10px 25px ${prize.glow}`,
                                                    }}
                                                >
                                                    {prize.note}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 relative'>
                        <div className='absolute -inset-6 bg-gradient-to-br from-[#FFED9F]/20 via-[#F5BB0B]/10 to-transparent blur-3xl opacity-70' />
                        <div className='relative rounded-[32px] border border-white/10 bg-gradient-to-br from-[#09011B] via-[#1A0732] to-[#3A0B3C] p-6 shadow-[0_35px_80px_rgba(0,0,0,0.6)] overflow-hidden'>
                            <div className='absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(circle,_rgba(255,255,255,0.3),_transparent_60%)] opacity-40 pointer-events-none' />
                            <div className='relative flex flex-col items-center text-center gap-4'>
                                <p className='text-sm uppercase tracking-[0.4rem] text-white/60'>Limited Edition</p>
                                <Image
                                    src='/Cup Number 5000.png'
                                    width={500}
                                    height={500}
                                    alt='TVK Cup'
                                    className='drop-shadow-[0_30px_45px_rgba(0,0,0,0.7)] animate-bounce'
                                />
                                <p className='text-lg font-semibold'>
                                    Collect, Share & Win
                                </p>
                                <p className='text-white/70 text-sm'>
                                    Keep your receipt handy. Winners will be contacted via registered details.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default LuckyDraw