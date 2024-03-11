'use client'
import Footer from '@/components/Footer'
import NavbarUser from '@/components/NavbarUser'
import { Stack, Box, Typography } from '@mui/material'
import React from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';

const page = () => {
  return (
    <Stack>
        <NavbarUser />
        <Stack sx={{ display: 'flex', flexDirection: 'column', height: 675, justifyContent: 'center', marginX: 'auto', gap: 5 }}>
          <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
            <Box sx={{ bgcolor: 'gray', height: 130, width: 130, borderRadius: 20 }}></Box>
            <Typography sx={{ fontSize: 30 }}>УгтахБаяр</Typography>
          </Stack>
          <Stack sx={{ display: 'flex', gap: 2 }}>
            <Stack sx={{ display: 'flex', padding: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: 350, height: 70, bgcolor: '#F5f5F5', borderRadius: 1 }}>
              <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Box sx={{ width: 40, height: 40, bgcolor: 'white', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><PersonOutlineOutlinedIcon /></Box>
                <Stack sx={{}}>
                  <Typography sx={{ fontSize: 13, color: '#949493' }}>Таны нэр</Typography>
                  <Typography sx={{ fontSize: 17 }}>УгтахБаяр</Typography>
                </Stack>
              </Stack>
              <Stack><CreateOutlinedIcon sx={{ color: '#18BA51'}}/></Stack>
            </Stack>
            <Stack sx={{ display: 'flex', padding: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: 350, height: 70, bgcolor: '#F5f5F5', borderRadius: 1 }}>
              <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Box sx={{ width: 40, height: 40, bgcolor: 'white', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><LocalPhoneOutlinedIcon /></Box>
                <Stack sx={{}}>
                  <Typography sx={{ fontSize: 13, color: '#949493' }}>Утасны дугаар</Typography>
                  <Typography sx={{ fontSize: 17 }}>УгтахБаяр</Typography>
                </Stack>
              </Stack>
              <Stack><CreateOutlinedIcon sx={{ color: '#18BA51'}}/></Stack>
            </Stack>
            <Stack sx={{ display: 'flex', padding: 2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: 350, height: 70, bgcolor: '#F5f5F5', borderRadius: 1 }}>
              <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Box sx={{ width: 40, height: 40, bgcolor: 'white', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><ForwardToInboxOutlinedIcon /></Box>
                <Stack sx={{}}>
                  <Typography sx={{ fontSize: 13, color: '#949493' }}>Имэйл хаяг</Typography>
                  <Typography sx={{ fontSize: 17 }}>УгтахБаяр</Typography>
                </Stack>
              </Stack>
              <Stack><CreateOutlinedIcon sx={{ color: '#18BA51'}}/></Stack>
            </Stack>
            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, paddingLeft: 2 }}>
              <Box sx={{ width: 40, height: 40, bgcolor: 'white', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', border: 0.5, borderColor: '#DFDFDF' }}><RestoreOutlinedIcon /></Box>
              <Typography>Захиалгын түүхүүд</Typography>
            </Stack>
            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, paddingLeft: 2 }}>
              <Box sx={{ width: 40, height: 40, bgcolor: 'white', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', border: 0.5, borderColor: '#DFDFDF' }}><SensorDoorOutlinedIcon /></Box>
              <Typography>Гарах</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Footer />
    </Stack>
  )
}

export default page