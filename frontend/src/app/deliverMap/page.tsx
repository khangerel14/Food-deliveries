'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Stack } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <Stack>
        <Navbar />
        <Footer />
    </Stack>
  )
}

export default page