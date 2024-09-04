'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Homes() {
    const { push } = useRouter()
    useEffect(() => {push('/home')}, [])
    return (<></>)
}
