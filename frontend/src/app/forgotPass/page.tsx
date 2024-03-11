'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const page = () => {
  return (
    <Stack>
        <Navbar />
            <Stack sx={{ display: 'flex', marginX: 'auto', justifyContent: 'center', alignItems: 'center', height: 675, gap: 7 }}>
                <Typography sx={{ fontSize: 30, fontWeight: 'semibold' }}>Нууц үг сэргээх</Typography>
                <Stack sx={{ display: "flex", flexDirection: "column", width: 384 }}>
                    <label htmlFor="">Имэйл</label>
                    <TextField id="outlined-basic" label="И-мэйл хаягаа оруулна уу" variant="outlined"/>
                </Stack>
                <Button size="medium" color='success' sx={{ color: "gray", bgcolor: '#C8C7C7', width: 384, padding: 2, border: "1px solid green" }}>Үргэлжлүүлэх</Button>
            </Stack>
        <Footer />
    </Stack>
  )
}

export default page