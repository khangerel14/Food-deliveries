import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { v4 as uuidv4 } from "uuid"
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';

const data = [
    {
        url: <AutoStoriesOutlinedIcon />,
        h1: "Хүргэлтийн төлөв хянах",
        desc: "Захиалга бэлтгэлийг явцийг хянах"
    },
    {
        url: <AccessTimeOutlinedIcon />,
        h1: "Шуурхай хүргэлт",
        desc: "Захиалга бэлтгэлийг явцийг хянах"
    },
    {
        url: <DinnerDiningOutlinedIcon />,
        h1: "Эрүүл баталгаат орц",
        desc: "Захиалга бэлтгэлийг явцийг хянах"
    },
    {
        url: <AutoStoriesOutlinedIcon />,
        h1: "Хоолны өргөн орц",
        desc: "Захиалга бэлтгэлийг явцийг хянах"
    }
]

const InfoCard = () => {
  return (
    <Stack sx={{ display: "flex", width: 1280, marginX: "auto", gap: 1, flexDirection: "row", justifyContent: "space-between", marginY: 15 }}>
        {
            data.map((el) => {
                let key = uuidv4()
                return (
                    <Stack sx={{ padding: 2, border: "1px solid gray", width: "fit", borderRadius: 3, height: 150, flexDirection: "column", justifyContent: "space-between", boxShadow: 5 }} key={key}>
                        <Box sx={{ color: '#18BA51', padding: 1}}>{ el.url }</Box>
                        <Box>
                            <Typography sx={{ fontWeight: "bold" }}>{el.h1}</Typography>
                            <Typography sx={{ color: "gray", fontWeight: "light"}}>{el.desc}</Typography>
                        </Box>
                    </Stack>
                )
            })
        }
    </Stack>
  )
}

export default InfoCard