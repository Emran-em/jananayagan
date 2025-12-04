"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
const InvoicePdfDownloadButton = dynamic(
    () => import("@/components/layouts/user/InvoicePdfDownloadButton"),
    { ssr: false }
)
import { FaRupeeSign } from "react-icons/fa"

import React from 'react'
import ShareImgComponent from "./ShareImgComponent"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/hooks/useAuth"
import { AllOrders } from "@/api/OrderAPI"
import Heading from "@/components/ui/user/Heading"
import Paragraph from "@/components/ui/user/Paragraph"

type DeliveryDetailProps = {
    addressLine1: string
    city: string
    country: string
    fullName: string
    instructions: string
    landmark: string
    phone: string
    postalCode: string
    state: string
}

type ItemsProps = {
    price: number
    productName: string
    quantity: number
    totalPrice: number
}

type DataProps = {
    deliveryDetails: DeliveryDetailProps
    email: string
    items: ItemsProps[]
    orderId: string
    orderNumber: string
    orderStatus: string
    paymentStatus: string
}

const Invoice = () => {
    const [ toggle, setToggle ] = React.useState(false)
    const [ orderId, setOrderId ] = React.useState('')
    const { token } = useAuth()

    const handleToggle = (data?: string) => {
        setToggle((prev) => !prev)
        if(data) {
            setOrderId(data)
        }
    }

    const {
        data,
        isPending,
        isError,
        isSuccess
    } = useQuery({
        queryKey: ['summary'],
        queryFn: () => AllOrders(token!),
        enabled: !!token
    })

    if(isPending) {
        return (
            <div className='w-full h-[40vh] flex justify-center items-center'>
                <span className='content-loader'></span>
            </div>
        )
    }

    return (
        <>
            <div className="w-full min-h-[50vh] my-7">
                <div className="text-center md:w-[80%] lg:w-[50%] mx-auto">
                    <h1 className="text-[1.2rem] font-semibold my-2 md:text-[2rem] bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] text-transparent bg-clip-text">THANK YOU!</h1>
                    <p className="text-[0.9rem] md:text-[1.2rem] font-light text-white">We received your order and will start preparing your package right away. You will receive a confirmation email in a moment.</p>
                </div>

                {isSuccess && data?.data?.filter((item: DataProps) => item?.paymentStatus === "completed")?.map((item: DataProps, index: number) => (
                    <div key={index}>
                        <div className="flex gap-3 my-5 lg:w-[100%] lg:mx-auto py-4 px-2">
                            <div className="flex flex-col gap-2 md:flex-row flex-1">
                                <Image
                                    src="/Cup Number 277.png"
                                    alt="cup image"
                                    width={125}
                                    height={125}

                                />
                                <div className="flex flex-col gap-3 lg:flex-row lg:gap-20">
                                    <p className="text-xs md:text-md lg:text-lg text-[#F5BB0B]">Official {item?.items?.[0]?.productName}</p>
                                    <p className="text-xs md:text-md lg:text-lg flex items-center md:flex-row md:items-start text-[#F5BB0B]">
                                        <FaRupeeSign className="md:my-[3px]" />
                                        <span>{item?.items?.[0]?.totalPrice}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="md:flex md:justify-between flex-1 text-[#F5BB0B]">
                                <div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-xs md:text-md lg:text-lg text-[#fff] font-light">Delivery Details</h1>
                                    </div>
                                    <p className="text-xs md:text-md lg:text-lg my-2">{item?.deliveryDetails?.addressLine1} , {item?.deliveryDetails?.fullName}, {item?.deliveryDetails?.landmark}, {item?.deliveryDetails?.city} , {item?.deliveryDetails?.state} {item?.deliveryDetails?.country}</p>
                                    <div>
                                        <h1 className="text-xs md:text-md lg:text-lg text-[#fff] font-light">Contact information</h1>
                                        <span className="text-[#F5BB0B] text-xs md:text-sm lg:text-md">{item?.email}</span>
                                    </div>
                                </div>
                                <div className="md:flex md:flex-col">
                                    <button
                                        className="bg-[#F5BB0B] px-7 py-2 text-xs text-[#000] uppercase mb-2 cursor-pointer"
                                        onClick={() => handleToggle(item?.orderId)}
                                    >
                                        Status Download
                                    </button>
                                    <InvoicePdfDownloadButton orderId={item?.orderId} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {toggle && <ShareImgComponent handleToggle={handleToggle} orderId={orderId} />}
                {
                    isError && (
                        <div className='w-full h-50 flex flex-col justify-center items-center'>
                            <Heading content='Oops! No Orders Found' />
                            <Paragraph content="We couldn't find any Order." />
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Invoice